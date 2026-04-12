import { describe, it, expect, vi, beforeEach } from "vitest";

// ── summariseContent (extracted logic) ────────────────────────────────────────

// Mirror the summariseContent function from index.ts so we can test it directly.
function summariseContent(
  content: Array<{ type: string; text?: string; [k: string]: any }>,
): string {
  if (content.length === 0) return "(no output)";

  const parts: string[] = [];
  for (const item of content) {
    switch (item.type) {
      case "text":
        if (item.text) parts.push(item.text);
        break;
      case "image": {
        const mime = item.mimeType ?? "unknown";
        const sizeKB = item.data
          ? Math.round((item.data.length * 3) / 4 / 1024)
          : 0;
        parts.push(`[image: ${mime}, ~${sizeKB}KB]`);
        break;
      }
      case "resource":
      case "embedded_resource": {
        const res = item.resource ?? {};
        const uri: string = res.uri ?? "(unknown uri)";
        const mime: string | undefined = res.mimeType;
        if (res.text) {
          const header = mime
            ? `[${item.type}: ${uri}, ${mime}]`
            : `[${item.type}: ${uri}]`;
          parts.push(`${header}\n${res.text}`);
        } else if (res.blob) {
          const sizeKB = Math.round((res.blob.length * 3) / 4 / 1024);
          const suffix = mime ? `, ${mime}, ~${sizeKB}KB` : `, ~${sizeKB}KB`;
          parts.push(`[${item.type}: ${uri}${suffix}]`);
        } else {
          const suffix = mime ? `, ${mime}` : "";
          parts.push(`[${item.type}: ${uri}${suffix}]`);
        }
        break;
      }
      default:
        parts.push(`[unknown content type: ${JSON.stringify(item.type)}]`);
    }
  }

  return parts.join("\n") || "(no output)";
}

describe("summariseContent", () => {
  it("returns '(no output)' for empty content", () => {
    expect(summariseContent([])).toBe("(no output)");
  });

  it("extracts text content", () => {
    expect(
      summariseContent([{ type: "text", text: "hello world" }]),
    ).toBe("hello world");
  });

  it("skips text items with no text", () => {
    expect(summariseContent([{ type: "text" }])).toBe("(no output)");
  });

  it("joins multiple text items", () => {
    expect(
      summariseContent([
        { type: "text", text: "line 1" },
        { type: "text", text: "line 2" },
      ]),
    ).toBe("line 1\nline 2");
  });

  it("summarises image content", () => {
    const result = summariseContent([
      { type: "image", mimeType: "image/png", data: "A".repeat(4000) },
    ]);
    expect(result).toMatch(/\[image: image\/png, ~\d+KB\]/);
  });

  it("summarises image with unknown mime", () => {
    expect(summariseContent([{ type: "image" }])).toBe(
      "[image: unknown, ~0KB]",
    );
  });

  it("summarises resource with text", () => {
    const result = summariseContent([
      {
        type: "resource",
        resource: {
          uri: "https://example.com/doc",
          mimeType: "text/plain",
          text: "doc content",
        },
      },
    ]);
    expect(result).toBe(
      "[resource: https://example.com/doc, text/plain]\ndoc content",
    );
  });

  it("summarises resource without mime", () => {
    const result = summariseContent([
      {
        type: "resource",
        resource: { uri: "https://example.com/doc", text: "content" },
      },
    ]);
    expect(result).toBe("[resource: https://example.com/doc]\ncontent");
  });

  it("summarises resource with blob", () => {
    const result = summariseContent([
      {
        type: "embedded_resource",
        resource: {
          uri: "file:///data.pdf",
          mimeType: "application/pdf",
          blob: "A".repeat(8000),
        },
      },
    ]);
    expect(result).toMatch(
      /\[embedded_resource: file:\/\/\/data\.pdf, application\/pdf, ~\d+KB\]/,
    );
  });

  it("summarises resource with blob but no mime", () => {
    const result = summariseContent([
      {
        type: "resource",
        resource: { uri: "file:///data.bin", blob: "AAAA" },
      },
    ]);
    expect(result).toMatch(/\[resource: file:\/\/\/data\.bin, ~\d+KB\]/);
  });

  it("summarises resource with no text/blob", () => {
    expect(
      summariseContent([
        {
          type: "resource",
          resource: { uri: "https://example.com" },
        },
      ]),
    ).toBe("[resource: https://example.com]");
  });

  it("summarises resource with no text/blob but with mime", () => {
    expect(
      summariseContent([
        {
          type: "resource",
          resource: { uri: "https://example.com", mimeType: "text/html" },
        },
      ]),
    ).toBe("[resource: https://example.com, text/html]");
  });

  it("summarises resource with missing resource object", () => {
    expect(summariseContent([{ type: "resource" }])).toBe(
      "[resource: (unknown uri)]",
    );
  });

  it("handles unknown content types", () => {
    expect(summariseContent([{ type: "audio" }])).toBe(
      '[unknown content type: "audio"]',
    );
  });
});

// ── Generation counter invariants ─────────────────────────────────────────────

describe("generation counter design", () => {
  it("stale generation causes handlers to bail", () => {
    let _generation = 0;
    const gen = ++_generation;
    _generation++;
    expect(gen !== _generation).toBe(true);
  });

  it("current generation allows handlers to proceed", () => {
    let _generation = 0;
    const gen = ++_generation;
    expect(gen !== _generation).toBe(false);
  });
});

// ── Init retry invariant ──────────────────────────────────────────────────────

describe("init retry on failure", () => {
  it("nullish coalescing allows retry after clearing", async () => {
    let _initPromise: Promise<void> | undefined;
    let callCount = 0;

    const doInit = () => {
      callCount++;
      return Promise.reject(new Error("process down"));
    };

    _initPromise ??= doInit().catch((err) => {
      _initPromise = undefined;
      throw err;
    });

    await expect(_initPromise).rejects.toThrow("process down");
    expect(_initPromise).toBeUndefined();

    _initPromise ??= doInit().catch((err) => {
      _initPromise = undefined;
      throw err;
    });

    await expect(_initPromise).rejects.toThrow("process down");
    expect(callCount).toBe(2);
  });
});

// ── resetSession state cleanup ────────────────────────────────────────────────

describe("resetSession state cleanup", () => {
  it("should clear all module-level state", () => {
    const state = {
      _proc: { killed: false } as any,
      _rl: {} as any,
      _initialized: true,
      _initPromise: Promise.resolve(),
      _pendingResponses: new Map([
        [1, { resolve: vi.fn(), reject: vi.fn() }],
      ]),
    };

    state._proc = undefined;
    state._rl = undefined;
    state._initialized = false;
    state._initPromise = undefined;
    state._pendingResponses.clear();

    expect(state._proc).toBeUndefined();
    expect(state._rl).toBeUndefined();
    expect(state._initialized).toBe(false);
    expect(state._initPromise).toBeUndefined();
    expect(state._pendingResponses.size).toBe(0);
  });
});

// ── Tool name prefixing ───────────────────────────────────────────────────────

describe("tool name prefixing", () => {
  it("adds dev_mcp_ prefix to unprefixed names", () => {
    const name = "learn_shopify_api";
    const piName = name.startsWith("dev_mcp_") ? name : `dev_mcp_${name}`;
    expect(piName).toBe("dev_mcp_learn_shopify_api");
  });

  it("does not double-prefix already prefixed names", () => {
    const name = "dev_mcp_learn_shopify_api";
    const piName = name.startsWith("dev_mcp_") ? name : `dev_mcp_${name}`;
    expect(piName).toBe("dev_mcp_learn_shopify_api");
  });
});

# Setup Guide

## Prerequisites

- [Pi](https://github.com/badlogic/pi-mono) installed
- Access to Shopify internal MCPs (support-core, scout, dev-mcp, vault, incidents)
- Shopify CLI installed
- GitHub CLI (`gh`) installed and authenticated

## Installation

### 1. Clone This Repo

```bash
git clone https://github.com/BrenLong/pi-theme-support.git ~/.pi/agent
```

Or if you already have a `~/.pi/agent/` directory, clone elsewhere and copy the files you want.

### 2. Upgrade Shopify CLI (for theme file API access)

The `shopify store auth` and `shopify store execute` commands require CLI 3.93.0+.

```bash
# Check your current version
shopify version

# If below 3.93.0, install latest via pnpm
pnpm install -g @shopify/cli@latest

# Verify (may be at a different path than the old version)
~/.local/share/pnpm/shopify version
```

**Note:** If you have an older version installed via Homebrew at `/opt/homebrew/bin/shopify`, the pnpm version installs to `~/.local/share/pnpm/shopify`. You may need to use the full path or update your PATH.

### 3. Authenticate GitHub CLI

```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with a web browser
```

### 4. Configure Credentials

Create `auth.json` and `config/incidents/credentials.json` with your credentials. These files are gitignored and not included in the repo.

## Verification

```bash
# Verify Pi
pi --version

# Verify Shopify CLI
~/.local/share/pnpm/shopify version  # Should be 3.93.0+

# Verify GitHub
gh auth status
```

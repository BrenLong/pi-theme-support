# Setup Guide

## Prerequisites

- [Pi](https://github.com/badlogic/pi-mono) installed
- Access to Shopify internal MCPs (support-core, scout, dev-mcp, vault, incidents)
- GitHub CLI (`gh`) installed and authenticated

## Installation

### 1. Clone This Repo

```bash
git clone https://github.com/BrenLong/pi-theme-support.git ~/.pi/agent
```

Or if you already have a `~/.pi/agent/` directory, clone elsewhere and copy the files you want.

### 2. Authenticate GitHub CLI

```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with a web browser
```

### 3. Configure Credentials

Create `auth.json` and `config/incidents/credentials.json` with your credentials. These files are gitignored and not included in the repo.

## Verification

```bash
# Verify Pi
pi --version

# Verify GitHub
gh auth status
```

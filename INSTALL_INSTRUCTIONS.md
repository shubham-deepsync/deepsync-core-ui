# Node.js Installation Instructions

## Quick Install

I've set up nvm (Node Version Manager) for you. To complete the Node.js installation, run:

```bash
cd /Users/nitin/TestResultMatch/deepsync-core-ui
./install-node.sh
```

Or manually:

```bash
# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js
nvm install --lts

# Set as default
nvm alias default node

# Verify
node --version
npm --version
```

## After Installation

Once Node.js is installed:

```bash
cd /Users/nitin/TestResultMatch/deepsync-core-ui
npm install
npm run dev
```

## Alternative: Direct Download

If nvm doesn't work, you can download Node.js directly:

1. Visit: https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

Then run:
```bash
cd /Users/nitin/TestResultMatch/deepsync-core-ui
npm install
npm run dev
```

## Note

nvm has been added to your `~/.zshrc` file, so it will be available in new terminal sessions. For the current session, you may need to run:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

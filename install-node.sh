#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS
echo "Installing Node.js LTS version..."
nvm install --lts

# Set as default
nvm alias default node

# Use it
nvm use --lts

# Verify installation
echo ""
echo "Verifying installation..."
node --version
npm --version

echo ""
echo "✅ Node.js and npm are now installed!"
echo ""
echo "Next steps:"
echo "1. Run: cd deepsync-core-ui"
echo "2. Run: npm install"
echo "3. Run: npm run dev"

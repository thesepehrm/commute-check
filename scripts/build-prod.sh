#!/bin/bash

# Exit on error
set -e

echo "🚀 Building Commute Check Extension for production..."

# Clean up any previous build
rm -rf dist

# Run the production build
echo "📦 Running production build..."
pnpm run build:prod

# Create a zip file for Chrome Web Store submission
echo "📂 Creating zip archive for Chrome Web Store..."
cd dist
zip -r ../commute-check-extension.zip .
cd ..

echo "✅ Production build complete!"
echo "📁 The build files are in the 'dist' directory"
echo "📄 The Chrome Web Store package is 'commute-check-extension.zip'"

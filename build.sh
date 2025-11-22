#!/bin/bash

echo "🚀 Building Vision Assistant for Android..."
echo ""

# Copy web assets
echo "📦 Copying web assets..."
npx cap copy android

# Sync plugins
echo "🔄 Syncing plugins..."
npx cap sync android

echo ""
echo "✅ Build preparation complete!"
echo ""
echo "Next steps:"
echo "1. Run: npx cap open android"
echo "2. In Android Studio, click the green Run button"
echo "3. Select your Samsung device"
echo "4. Test the camera focus!"
echo ""

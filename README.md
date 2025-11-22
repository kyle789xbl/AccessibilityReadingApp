# Vision Assistant - Capacitor Android App

This app wraps your Vision Assistant web app with Capacitor to provide native Android camera access with proper autofocus.

## What This Solves

✅ **Native Camera Autofocus** - Uses Android Camera2 API for proper autofocus like the native camera app
✅ **Better Image Quality** - Access to full camera resolution and hardware features  
✅ **Keeps Your Web Code** - Your existing HTML/CSS/JS works as-is
✅ **Easy Updates** - Update the web files, rebuild, done

## Setup Instructions

### Prerequisites
- Node.js installed (v16 or higher)
- Android Studio installed
- Java JDK 17 or higher

### 1. Install Dependencies
```bash
cd vision-assistant-app
npm install
```

### 2. Update Your HTML (Already Done)
The index.html in `/www` folder has been updated with:
- Capacitor core library
- Native camera wrapper (native-camera.js)

### 3. Build for Android

```bash
# Copy web assets to Android
npx cap copy android

# Open in Android Studio
npx cap open android
```

### 4. In Android Studio

1. Wait for Gradle sync to complete
2. Connect your Samsung S21/S23 via USB (enable Developer Mode + USB Debugging)
3. Click the green "Run" button
4. Select your device
5. App will install and launch!

### 5. Test Camera Focus

The app will now use the native Android camera with:
- **Continuous autofocus** (like native camera app)
- **Tap-to-focus** capability
- **4K resolution** support
- **Better low-light performance**

## How It Works

### Native Camera Wrapper
The `native-camera.js` file detects if running in Capacitor (native) or browser:

**On Android (Capacitor):**
- Uses `@capacitor/camera` plugin for photo capture
- getUserMedia is routed through native camera APIs
- Autofocus handled by Android Camera2 API

**In Browser (fallback):**
- Falls back to standard getUserMedia
- Still works, just without native camera benefits

### File Structure
```
vision-assistant-app/
├── www/
│   ├── index.html          # Your web app
│   └── native-camera.js    # Camera wrapper
├── android/                # Generated Android project  
├── capacitor.config.ts     # Capacitor configuration
└── package.json
```

## Making Changes

### Update Web Files
1. Edit files in `/www` folder
2. Run: `npx cap copy android`
3. Rebuild in Android Studio

### Update API Keys
Edit `/www/index.html` - the API key input modal works the same

## Permissions

The app automatically requests camera permissions on first launch.

Permissions are defined in `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## Building Release APK

In Android Studio:
1. Build > Generate Signed Bundle / APK
2. Choose APK
3. Create/select keystore
4. Build release APK
5. APK will be in `android/app/release/`

## Troubleshooting

### Camera Not Focusing
- Make sure you're testing on actual device (not emulator)
- Check camera permissions in Android settings
- Try tapping the screen to trigger focus

### App Won't Build
- Make sure Android SDK is installed
- Check Java version: `java -version` (should be 17+)
- Clean build: Build > Clean Project in Android Studio

### Changes Not Showing
- Always run `npx cap copy android` after changing /www files
- Or use `npx cap sync android` to copy and update plugins

## Next Steps

1. Test on your Samsung device
2. If camera focuses well, you're done!
3. Customize the UI in index.html as needed
4. Build release APK when ready

The native camera should now focus just like your phone's camera app!

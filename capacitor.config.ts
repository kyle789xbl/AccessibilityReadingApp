import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.visionassistant.app',
  appName: 'Vision Assistant',
  webDir: 'www',
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    Camera: {
      saveToGallery: false,
      correctOrientation: true,
      quality: 95
    }
  }
};

export default config;

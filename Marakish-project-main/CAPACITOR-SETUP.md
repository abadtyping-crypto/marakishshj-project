# Capacitor Mobile App Setup - Marakish

## ✅ Setup Complete!

Android and iOS projects have been successfully added to your Marakish application.

### 📱 Project Structure
- **App ID**: `org.marakish.app`
- **App Name**: Marakish
- **Bundle**: `dist/` folder
- **Server**: https://app.marakish.org

### 🔧 Available NPM Scripts

#### Sync web assets to native projects:
```bash
npm run cap:sync
```
This builds your web app and copies it to Android & iOS projects.

#### Open in native IDEs:
```bash
npm run cap:open:android    # Opens Android Studio
npm run cap:open:ios        # Opens Xcode (macOS only)
```

#### Build and run on devices/emulators:
```bash
npm run cap:run:android     # Run on Android
npm run cap:run:ios         # Run on iOS (macOS only)
```

### 📋 Requirements

**For Android Development:**
- Android Studio installed
- Android SDK configured
- Java JDK 17+

**For iOS Development (macOS only):**
- Xcode installed
- CocoaPods installed (`sudo gem install cocoapods`)
- Apple Developer account (for device testing/publishing)

### 🚀 Next Steps

1. **Test on Android:**
   ```bash
   npm run cap:open:android
   ```
   - Android Studio will open
   - Connect an Android device or start an emulator
   - Click the "Run" button in Android Studio

2. **Test on iOS (macOS only):**
   ```bash
   npm run cap:open:ios
   ```
   - Xcode will open
   - Select a simulator or connected iOS device
   - Click the "Run" button in Xcode

3. **Build for Production:**
   - **Android**: Generate signed APK/AAB in Android Studio
   - **iOS**: Archive and upload to App Store Connect

### 📁 Project Folders
- `android/` - Native Android project
- `ios/` - Native iOS/Xcode project
- `dist/` - Built web assets (copied to native projects)

### 🔄 Workflow
Every time you make changes to your web app:
```bash
npm run cap:sync
```
This will rebuild and sync your changes to both platforms.

### 🌐 Configuration
The app is configured to load from: **https://app.marakish.org**

To run locally instead, edit `capacitor.config.ts` and remove the `server` block.

---

**Firebase Integration**: Your existing Firebase Auth and Firestore will work seamlessly in the mobile apps! 🎉

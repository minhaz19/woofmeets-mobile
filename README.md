## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storagee) as storage solution.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.


## Install and run on android
```
npm install -g react-native-cli
cd woofmeets
npm install / yarn
npx react-native run-android / yarn android
```

## Install and run on ios
```
npm install -g react-native-cli
cd woofmeets
npm install / yarn
cd ios && pod install && cd ..
npx react-native run-ios / yarn ios
```

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
          - `theme`: Folder to store all the styling concerns related to the application theme.
          - `UI`: Folder to store all the the general UI.
          - `common`: Folder to store all the common components.
  - `constants`: Folder to store any kind of constant that you have.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
      - `Screen.js`
      - `Screen.styles.js`
      - `Screen.test.js`
  - `storage`: Folder that contains the application storage logic.
  - `store`: Folder to put all redux middlewares and the store.
  - `test-utils`: Folder to store tests-related utilities and components.
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

  Deployment Debug version 0.0.1

APK install link: https://portal.testapp.io/apps/install/DNm9PabPGy8mz

Apk download link: https://drive.google.com/file/d/1hkPguEcIqCWuSxlnU0NW96WmEJ2kX0O3/view?usp=drivesdk



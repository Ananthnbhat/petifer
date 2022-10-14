## Instructions on how to start react-native app

react native should be installed first along with prerequisites such as java, android studio. Follow instructions here - https://reactnative.dev/docs/environment-setup

In the `petiferFrontend` folder, install dependencies -

```
npm i --legacy-peer-deps
```

Then start the app -

```
npx react-native run-android
```

## Other resources

Tab navigation guide - https://reactnavigation.org/docs/tab-based-navigation/

Image picker - https://www.npmjs.com/package/react-native-image-picker

Loading animation - use ActivityIndicator

Show a popup (Modal) when required - use react-native-modal

tabs to show lost & found options in Home page: https://www.npmjs.com/package/react-native-segmented-control-tab

find the address using lat & lng: https://www.npmjs.com/package/react-native-geocoder

### To run the app in the phone, need to kill any processes running on 8081

npx kill-port 8081

### To create an APK file, a keystore file is required
More information here - https://reactnative.dev/docs/signed-apk-android

## To run the app from the phone

1. Connect phone and laptop to same network, disable browsable API in settings.py (django server code)
2. Find IPv4 of the network using ipconfig command in cmd
3. Use that IP to call the API from the app (change the URL in postNewPet.js)
4. Run the python server as `python manage.py runserver 0.0.0.0:8000`
5. Connect phone to laptop using USB and enable USB debugging in the phone
6. Make sure phone is visible when you run `adb devices` in cmd
7. Run `npx react-native run-android`. This will install the app on the phone and start working.
8. Stop the previous command and disconnect USB connection between the phone & laptop
9. Run `npm start` to run the react native dev server (python server is still running)
10. Open the app and change the debug host:port in the settings as ipaddressOfNetwork:8081
11. Now the app should work via same network.

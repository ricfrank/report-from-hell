Requirements
=
- nvm
- docker >= 17.12.x

Development
===========

Run docker (with `--build` only first time) to install and configure a local redmine instance:
- ```docker-compose up -d --build```

If you want log into redmine:
- Go to ```http://localhost:8080/login```
- Credentials: 
    - Admin user: `admin:1234qwer`
    - Dev user:  `idex:1234qwer`

Run application:
- ```nvm use```
- check if node version is 6.9.4
- if not ```nvm install 6.9.4```
- ```npm install && npm start```
- Go to ```http://localhost:4000```

Test
=

`npm run test-watch`

or in watch mode:

`npm run test-watch`

Build Web App
=============
```npm run build```

To test build in browser, from project root directory, run:

```node server.js```

Go to ```http://localhost:3000```

Build Desktop App
=================
```npm run dist```


[Download dmg](https://github.com/ricfrank/report-from-hell/tree/master/dist/outatime-0.0.2.dmg)

Build Mobile app
=================

For android:

```npm run run-android```

For iOS:

```npm run run-ios```

### Troubleshooting
If you get an error on your device like this: `"Unable to load script from assets index.android.bundle"` try the following:

```
$ adb reverse tcp:8081 tcp:8081
```
### Debugging
Shake your phone or navigate to the development menu and click on the `Debug JS remotely`. After this navigate to `http://localhost:8081/debugger-ui/` on your browser and open the dev tools. 

There is a great tool that combines React DevTools, Redux DevTools and the usual dev tools like console, network etc. which you can find here:

[React Native Debugger](https://github.com/jhen0409/react-native-debugger)

Happy debugging!
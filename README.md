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

# sequelize-test

A sample test case for sequelize issue

## Running locally

```
git clone https://github.com/arun-awnics/sequelize-test.git
cd sequelize-test

# install dependencies
npm install

# watches your files for any change and restarts the server
npm start

# run test cases
npm test
```

**Note** Server needs to be running before running the test case.

## Configuration

```
# configuring env
sequelize-test/.env.dev

# configuring MySql
sequelize-test/src/util/conn.mysql.js

# configuring app
sequelize-test/src/config/app.config.js

# configuring log4js
sequelize-test/src/config/log4js.json & sequelize-test/src/config/log4js.config.js
```

## License
MIT
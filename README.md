# sequelize-test

A starter boilerplate for NodeJS and Express

## Running the project locally

**Note** This project requires node v4.x.x or higher and npm 2.14.7 but in order to be able to take advantage of the complete functionality we **recommend node >=v6.5.0 and npm >=3.10.3**.

```
git clone https://github.com/arun-awnics/sequelize-test.git
cd sequelize-test

# install project's dependencies
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
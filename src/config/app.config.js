import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import lodash from 'lodash';
import MySql from '../util/conn.mysql';
import http from 'http';
import log from './log4js.config';
import user from '../apis/user/user.controller';

class Config {
    constructor() {
        this.app = express();
        this.session = session;
        this.flash = flash;
        this.http = http.Server(this.app);
        this.dotenv = dotenv;
        this.lodash = lodash;
        this.dotenv.config({ path: '.env.dev' });
    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    configureCORS() {
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest userDetails.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes() {
        this.app.use('/user', user);
    }

    listen(port) {
        this.http.listen(port, () => {
            log.info(`Server started: http://localhost:${port}/`);
        });
    }

    run() {
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Config;
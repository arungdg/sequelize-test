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
import FileUpload from '../apis/user/file-upload-service';
import Multer from 'multer';
import fs from 'fs';
import Storage from '@google-cloud/storage';

class Config {
    constructor() {
        this.app = express();
        this.session = session;
        this.flash = flash;
        this.fileUploadService = new FileUpload();
        this.http = http.Server(this.app);
        this.dotenv = dotenv;
        this.lodash = lodash;
        this.dotenv.config({ path: '.env.dev' });
        this.multer = Multer({
            storage: Multer.MemoryStorage,
            limits: {
                fileSize: 5 * 1024 * 1024 // no larger than 5mb
            }
        });
        this.storage = Storage({
            projectId: projectId,
            keyFilename: '/path/to/config.json'
        });
        this.bucket = this.storage.bucket(BUCKET_NAME);
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
        this.app.post('/fileUpload', this.multer.single('file'), (req, res, next) => {
            this.fileUploadService.uploadFile(req, this.bucket, next);
            res.send({ 'value': 'File successfully uploaded' });
        });
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

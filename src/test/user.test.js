import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';
import 'babel-polyfill';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var userService = new UserService();

describe('userDao', function() {
    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });

    it('Get all users', async function() {
        await userService.getAll((result) => {
            log.info('result ', result);
        });
    });
});
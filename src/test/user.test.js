import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';
import 'babel-polyfill';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var userService = new UserService();

describe('userDao', function() {

    for (var i = 0; i < 1000; i++) {
        it('creates a user', function(done) {
            this.timeout(1000);
            var user = {
                id: null,
                name: 'abc',
                email: 'abc@gmail.com',
                phoneNo: '9999999999',
                picUrl: '',
                description: 'Testing...',
                status: '',
                waitingTime: 10,
                rating: 4
            };
            userService.insert(user, (res) => {
                log.info('user value after insert: ' + JSON.stringify(res));
            });
            setTimeout(done, 500);
        });
    }

    for (var i = 0; i < 50; i++) {
        it('Get all users', async function() {
            await userService.getAll((result) => {
                log.info('result ', result);
            });
        });
    }
});
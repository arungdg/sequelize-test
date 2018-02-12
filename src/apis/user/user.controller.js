import express from 'express';
import UserDao from './user.dao';
import UserService from './user.service';
import log from '../../config/log4js.config';

var router = express.Router();
var userDao = new UserDao();
var userService = new UserService();

router.post('/controllers/createUser', function(req, res) {
    var user = req.body;
    userService.insert(user, (result, err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/controllers/getUsers', function(req, res) {
    userService.getAll((result) => {
        res.send(result);
    });
});

router.get('/controllers/getUserById/:id', function(req, res) {
    var id = req.params.id;
    userService.getById(id, (result) => {
        res.send(result);
    });
});

router.put('/controllers/putUser', function(req, res) {
    var user = req.body;
    userService.update(user, (result) => {
        res.send(result);
    });
});

router.delete('/controllers/deleteUser/:id', function(req, res) {
    var id = req.params.id;
    userService.delete(id, (result) => {
        res.send('Number of user deleted: ' + result);
    });
});

module.exports = router;
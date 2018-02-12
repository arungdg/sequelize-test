import log from '../../config/log4js.config';
import UserDao from './user.dao';

var userDao = new UserDao();

/**
 * UserService 
 */
class UserService {
    constructor() {}

    insert(user, callback) {
        return userDao.insert(user, (insertedUser) => {
            callback(insertedUser);
        });
    }

    update(user, callback) {
        return userDao.update(user, (updatedUser) => {
            callback(updatedUser);
        });
    }

    getAll(callback) {
        return userDao.readAll((users) => {
            callback(users);
        });
    }

    getById(id, callback) {
        return userDao.readById(id, (userById) => {
            callback(userById);
        });
    }

    delete(id, callback) {
        return userDao.delete(id, (deletedUser) => {
            callback(deletedUser);
        });
    }
}

export default UserService;
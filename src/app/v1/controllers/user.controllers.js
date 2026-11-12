const { Ok, Created, NoContent } = require('../../../cors/sycessReponse.cors');
const { NotFoundError } = require('../../../cors/reasonPhrases.cors');
const UserServices = require('../services/user.services');

class UserControllers {
    async getUsers(req, res) {
        const users = await UserServices.list();
        new Ok({ metadata: { users } }).send(res);
    }

    async getUserById(req, res) {
        const user = await UserServices.findById(req.params.id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        new Ok({ metadata: { user } }).send(res);
    }

    async createUser(req, res) {
        const user = await UserServices.create(req.body);
        new Created({
            message: 'User created successfully',
            metadata: { user }
        }).send(res);
    }

    async updateUser(req, res) {
        const user = await UserServices.update(req.params.id, req.body);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        new Ok({ message: 'User updated successfully', metadata: { user } }).send(res);
    }

    async deleteUser(req, res) {
        const deleted = await UserServices.remove(req.params.id);
        if (!deleted) {
            throw new NotFoundError('User not found');
        }
        return new NoContent().send(res);
    }
}

module.exports = new UserControllers();

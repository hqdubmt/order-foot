class UserServices {
    async list() {
        return [
            { id: 1, name: 'Demo User', email: 'demo@example.com' }
        ];
    }

    async findById(id) {
        if (id === '1') {
            return { id: 1, name: 'Demo User', email: 'demo@example.com' };
        }
        return null;
    }

    async create(userData) {
        if (!userData || typeof userData !== 'object') {
            throw new Error('Invalid user payload');
        }

        return {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
    }

    async update(id, userData) {
        if (id !== '1') {
            return null;
        }

        return {
            id: 1,
            ...(userData || {}),
            email: 'demo@example.com',
            updatedAt: new Date().toISOString()
        };
    }

    async remove(id) {
        return id === '1';
    }
}

module.exports = new UserServices();

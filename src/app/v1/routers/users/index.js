const express = require('express');
const asyncHandler = require('../../../../utils/asyncHandler.utils');
const UserControllers = require('../../controllers/user.controllers');
const authenticate = require('../../../../middlewares/auth.middleware');
const authorizePermission = require('../../../../middlewares/authorizePermission.middleware');
const Permissions = require('../../../../constants/permission.Constants');

const router = express.Router();

router.use(authenticate);

router.get(
    '/',
    authorizePermission(Permissions.USER_VIEW_ALL),
    asyncHandler(UserControllers.getUsers)
);
router.get(
    '/:id',
    authorizePermission(Permissions.USER_VIEW_ALL),
    asyncHandler(UserControllers.getUserById)
);
router.post(
    '/',
    authorizePermission(Permissions.USER_MANAGE),
    asyncHandler(UserControllers.createUser)
);
router.put(
    '/:id',
    authorizePermission(Permissions.USER_MANAGE),
    asyncHandler(UserControllers.updateUser)
);
router.delete(
    '/:id',
    authorizePermission(Permissions.USER_MANAGE),
    asyncHandler(UserControllers.deleteUser)
);

module.exports = router;

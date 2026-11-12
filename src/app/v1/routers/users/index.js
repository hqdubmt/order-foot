const express = require('express');
const asyncHandler = require('../../../../utils/asyncHandler.utils');
const UserControllers = require('../../controllers/user.controllers');

const router = express.Router();

router.get('/', asyncHandler(UserControllers.getUsers));
router.get('/:id', asyncHandler(UserControllers.getUserById));
router.post('/', asyncHandler(UserControllers.createUser));
router.put('/:id', asyncHandler(UserControllers.updateUser));
router.delete('/:id', asyncHandler(UserControllers.deleteUser));

module.exports = router;

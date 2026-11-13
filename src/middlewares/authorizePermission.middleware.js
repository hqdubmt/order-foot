const Permissions = require('../constants/permission.Constants');
const ROLE_PERMISSIONS = require('../constants/rolePermissions.Constants');
const {
  ForbiddenError,
  UnauthorizedError
} = require('../cors/reasonPhrases.cors');

const knownPermissions = new Set(Object.values(Permissions));

const authorizePermission = (permission) => {
  if (!knownPermissions.has(permission)) {
    throw new TypeError(`Unknown permission: ${permission}`);
  }

  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication is required'));
    }

    const role = req.user.role;
    if (
      typeof role !== 'string' ||
      !Object.hasOwn(ROLE_PERMISSIONS, role) ||
      !ROLE_PERMISSIONS[role].includes(permission)
    ) {
      return next(new ForbiddenError('You do not have permission to access this resource'));
    }

    return next();
  };
};

module.exports = authorizePermission;

# order-foot

## Middleware

The shared Express middleware stack is configured in `src/middlewares/index.js`.
API requests are limited to 100 per 15 minutes. User registration requires a
non-empty `name`, a valid `email`, and a `password` of at least 8 characters.

Protected routes can use the HS256 token authentication middleware:

```js
const authenticate = require('../../../../middlewares/auth.middleware');

router.get('/protected', authenticate, controller.handler);
```

Tokens must use HS256 and include an `exp` claim. Set a strong `JWT_SECRET`
environment variable before starting the server. On success, the decoded token
payload is available as `req.user`.

## RBAC

Protected user-management routes also check the permission mapped to
`req.user.role`. Supported roles are `admin_system`, `owner`, `manager`, `staff`,
and `customer`; the role-to-permission matrix is in
`src/constants/rolePermissions.Constants.js`. The users list/detail routes
require `user:view_all`; create/update/delete require `user:manage`.

To protect another route, put authentication before the permission check:

```js
const authenticate = require('../../../../middlewares/auth.middleware');
const authorizePermission = require('../../../../middlewares/authorizePermission.middleware');
const Permissions = require('../../../../constants/permission.Constants');

router.get(
  '/',
  authenticate,
  authorizePermission(Permissions.MENU_VIEW_ALL),
  controller.handler
);
```

The token issuer must set the `role` claim from trusted server-side user data;
do not accept a role supplied directly by a client. The current user service is
a demo implementation and does not enforce store/brand ownership filtering, so
role checks alone do not provide tenant-level data isolation.

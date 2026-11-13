const PermissionConstants = Object.freeze({
  // rbac
  RBAC_MANAGE: 'rbac:manage',

  //Users
  USER_VIEW_ALL: 'user:view_all',
  USER_VIEW_SELF: 'user:view_self',
  USER_MANAGE: 'user:manage',
  USER_CHANGE_PASSWORD: 'user:change_password',
  USER_UPDATE_SELF: 'user:update_self',
  //MENUS
  MENU_VIEW_ALL: 'menu:view_all',
  MENU_MANAGE: 'menu:manage',
  MENU_CREATE: 'menu:create',
  MENU_UPDATE: 'menu:update',
  MENU_DELETE: 'menu:delete',
  MENU_ITEM_IMAGE_UPLOAD: 'menu_item:image_upload',
  //ORDERS
  ORDER_VIEW_ALL: 'order:view_all',
  ORDER_VIEW_SELF: 'order:view_self',
  ORDER_CREATE_SELF: 'order:create_self',
  ORDER_MANAGE: 'order:manage',
  ORDER_UPDATE: 'order:update',
  ORDER_DELETE: 'order:delete',
  //PAYMENTS
  PAYMENT_VIEW_ALL: 'payment:view_all',
  PAYMENT_VIEW_SELF: 'payment:view_self',
  PAYMENT_MANAGE: 'payment:manage',
  PAYMENT_CREATE_SELF: 'payment:create_self',
  PAYMENT_UPDATE: 'payment:update',
  PAYMENT_DELETE: 'payment:delete',
  //MEDIA
  MEDIA_VIEW_ALL: 'media:view_all',
  MEDIA_MANAGE: 'media:manage',
  MEDIA_UPLOAD: 'media:upload',
  MEDIA_DELETE: 'media:delete',
  //QR CODE
  QR_LOGIN_CREATE: 'qr_login:create',
  QR_LOGIN_VERIFY: 'qr_login:verify',
  // NOTIFICATIONS
  NOTIFICATION_VIEW_ALL: 'notification:view_all',
  NOTIFICATION_VIEW_SELF: 'notification:view_self',
  NOTIFICATION_MANAGE: 'notification:manage',
  NOTIFICATION_CREATE_SELF: 'notification:create_self',
  NOTIFICATION_UPDATE: 'notification:update',
  NOTIFICATION_DELETE: 'notification:delete',
  //SYSTEM CONFIG
  SYSTEM_CONFIG_VIEW: 'system_config:view',
  SYSTEM_CONFIG_UPDATE: 'system_config:update'



});

module.exports = PermissionConstants;
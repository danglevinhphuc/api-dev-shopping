/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  "POST /api/auth/signup": {
    action: "auth/signup"
  },
  "POST /api/auth/signin": {
    action: "auth/signin"
  },
  "POST /api/auth/sigin-with-social": {
    action: "auth/sigin-with-social"
  },
  'GET /api/product/get/:id':{
    action: 'product/get'
  },
  'POST /api/product/edit':{
    action: "product/edit"
  },
  'POST /api/product/delete':{
    action : 'product/delete'
  },
  'POST /api/product/images/delete':{
    action : 'product/delete-image'
  },
  'POST /api/product/query':{
    action : 'product/get-by-query'
  },
  'POST /api/auth/verify-token':{
    action : 'auth/verify-token'
  },
  'POST /api/userinfo/upload/:id':{
    action : 'userInfo/upload'
  },
  'POST /api/userinfo/edit':{
    action : 'userInfo/edit'
  },
  'POST /api/product-type/edit':{
    action : 'productType/edit'
  },
  'GET /api/product-type/get/:id':{
    action : 'productType/get'
  },
  'POST /api/product-type/query':{
    action : 'productType/get-by-query'
  },
  'POST /api/product-type/delete':{
    action : 'productType/delete'
  },
  'POST /api/campaign/query':{
    action : 'campaign/get-by-query'
  },
  'POST /api/campaign/edit':{
    action : 'campaign/edit'
  },
  'POST /api/campaign/get/:id':{
    action : 'campaign/get'
  },
  'POST /api/campaign/delete':{
    action : 'campaign/delete'
  },
  'POST /api/product/get-ids':{
    action : 'product/get-by-ids'
  },
  'GET /api/product-type/get-template/:fileName?': {
    action: 'productType/get-template'
  },
  'POST /api/product-type/import':{
    action : 'productType/import'
  },
  'POST /api/product-type/export':{
    action : 'productType/export'
  },
  'POST /api/suggestion/create':{
    action : 'suggestion/create'
  },
  'POST /api/search':{
    action : 'suggestion/search'
  },
  'POST /api/auth/active-account':{
    action : 'auth/active-account-code'
  },
  'POST /api/auth/resend-otp':{
    action : 'auth/resend-otp'
  },
  'GET /api/auth/active-account-generate-link/:generateLink':{
    action : 'auth/active-account-generate-link'
  },
  'POST /api/auth/forgot-pass':{
    action : 'auth/forgot-password'
  },
  'POST /api/auth/reset-pass':{
    action : 'auth/reset-password'
  },
  // show data
  'POST /api/shoppingcart/product':{
    action : 'showdata/product/get-random'
  },
  'POST /api/firebase/edit':{
    action : 'crawler/firebase/edit'
  },
  'POST /api/firebase/get-by-query':{
    action : 'crawler/firebase/get-by-query'
  },
  /** Chat */
  'POST /api/send-webhook':{
    action : 'crawler/test/send-webhook'
  },
  'POST /api/chat/edit':{
    action : 'chat/edit'
  },
  'DELETE /api/chat/delete':{
    action : 'chat/delete'
  },
  'DELETE /api/chat-admin/delete':{
    action : 'chat-admin/delete'
  },
  'POST /api/chat-admin/edit':{
    action : 'chat-admin/edit'
  },
  'POST /api/chat-admin/get-by-query':{
    action : 'chat-admin/get-by-query'
  },
  /*** Conversation */
  'DELETE /api/conversation/delete':{
    action : 'conversation/delete'
  },
  'POST /api/conversation/query':{
    action : 'conversation/get-by-query'
  },
  /** Menu */
  'POST /api/menu/get-all':{
    action : 'menu/get-all'
  },
  'POST /api/menu/edit':{
    action : 'menu/edit'
  },
  'POST /api/menu/delete':{
    action : 'menu/delete'
  },
  'GET /api/menu/get/:id':{
    action : 'menu/get'
  },
  'POST /api/menu/update-position':{
    action : 'menu/update-position'
  },
  /** Icon header */
  'POST /api/icon-header/get-all':{
    action : 'icon-header/get-all'
  },
  'POST /api/icon-header/edit':{
    action : 'icon-header/edit'
  },
  'POST /api/icon-header/delete':{
    action : 'icon-header/delete'
  },
  'GET /api/icon-header/get/:id':{
    action : 'icon-header/get'
  },
  'POST /api/icon-header/update-position':{
    action : 'icon-header/update-position'
  },
  /** Product aggregate */
  'POST /api/product/group-with-type':{
    action : 'product/group-with-type'
  },
  /** History */
  'POST /api/history/get-by-query':{
    action : 'history/get-by-query'
  },
  /** statistics */
  'POST /api/statistics/get':{
    action : 'statistics/get'
  },
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝
};

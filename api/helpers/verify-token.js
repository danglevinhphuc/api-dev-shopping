var jwt = require('jsonwebtoken');
var tokenSecret = sails.config.custom.tokenjwt;
module.exports = {
  friendlyName: 'Verify Token',

  description: '',

  inputs: {
    token: { type: 'string', required: true }
  },

  exits: {},

  fn: function(inputs, exits) {
    var response = verify(inputs.token,function (err,data){
      if(err){
        return {success: false};
      }
      return {success: true};
    });
    return exits.success(response);
  }
}
function verify(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  )
}

var jwt = require('jsonwebtoken');
var tokenSecret = sails.config.custom.tokenjwt;
var jwtDecode = require('jwt-decode');
module.exports = {
  friendlyName: 'Sign in with social',
  description: 'Sign in description',
  inputs: {
    username: { type: 'string', required: true },
    token: {type: 'string',required:true},
    email : {type : "string" , required : true}
  },
  exits: {},
  fn: async function (inputs, exits) {
    var _this = this;
    await User.findOne({ username: inputs.username },async (err, user) => {
      if (!user || err) {
        return exits.success({ success: false, error: 'Username already exists' });
      }
      var decodeUser = jwtDecode(inputs.token);
      if (user.isActive && decodeUser && decodeUser.exp*1000 > new Date().getTime() && decodeUser.email == inputs.email ) {
        var token = generateToken({ id: user.id });
        await sails.helpers.historyActive.with({
          objectType: "sign-in",
          data: inputs,
          createdBy: inputs.username
        })
        return exits.success({ success: true, token, user });
      } else {
        return exits.success({ success: false, error: 'Not yet active account' });
      }
    });
  }
}
function generateToken(payload) {
  return jwt.sign(
    payload,
    tokenSecret,
    {
      expiresIn: 60 * 60 * 24
    }
  );
}

var jwt = require("jsonwebtoken");
var tokenSecret = sails.config.custom.tokenjwt;
module.exports = {
  friendlyName: "Sign in",
  description: "Sign in description",
  inputs: {
    username: { type: "string", required: true },
    password: { type: "string", required: true }
  },
  exits: {},
  fn: async function(inputs, exits) {
    var _this = this;
    var blockMinute = 1;
    var getDataFromRedis = await sails.helpers.getRedis.with({
      key: { key: inputs.username, type: "signin" }
    });
    if (
      !getDataFromRedis ||
      (getDataFromRedis && !getDataFromRedis.data) ||
      (getDataFromRedis &&
        getDataFromRedis.data &&
        getDataFromRedis.data.data.count < 4) ||
      (getDataFromRedis &&
        getDataFromRedis.data &&
        getDataFromRedis.data.data.count >= 4 &&
        getDataFromRedis.data.expired < new Date().getTime())
    ) {
      await User.findOne({ username: inputs.username }, (err, user) => {
        if (!user || err) {
          addCountSignInFail(getDataFromRedis, inputs, blockMinute);
          return exits.success({
            success: false,
            error: "Username already exists"
          });
        }
        if (user.isActive) {
          User.comparePassword(inputs.password, user, async function(
            err,
            valid
          ) {
            if (err) {
              addCountSignInFail(getDataFromRedis, inputs, blockMinute);
              return exits.success({
                success: false,
                error: "Password does not exist"
              });
            }
            if (valid) {
              var token = generateToken({ id: user.id });
              await sails.helpers.historyActive.with({
                objectType: "sign-in",
                data: inputs,
                createdBy: inputs.username
              });
              return exits.success({ success: true, token, user });
            } else {
              addCountSignInFail(getDataFromRedis, inputs, blockMinute);
              return exits.success({
                success: false,
                error: "Password does not exist"
              });
            }
          });
        } else {
          addCountSignInFail(getDataFromRedis, inputs, blockMinute);
          return exits.success({
            success: false,
            error: "Not yet active account"
          });
        }
      });
    } else {
      addCountSignInFail(getDataFromRedis, inputs, blockMinute);
      return exits.success({
        success: false,
        error: `Lock account ${blockMinute} minutes`
      });
    }
  }
};
function generateToken(payload) {
  return jwt.sign(payload, tokenSecret, {
    expiresIn: 60 * 60 * 24
  });
}
async function addCountSignInFail(getDataFromRedis, inputs, blockMinute) {
  var expired = new Date().getTime() + blockMinute * 60000;
  // var expired = new Date().getTime() + 10000;
  if (!getDataFromRedis || (getDataFromRedis && !getDataFromRedis.data)) {
    // set redis
    //
    await sails.helpers.setRedis.with({
      key: inputs.username,
      type: "signin",
      data: { count: 1 },
      expired
    });
  } else if (
    getDataFromRedis &&
    getDataFromRedis.data.data &&
    getDataFromRedis.data.data.count < 4
  ) {
    await sails.helpers.setRedis.with({
      key: inputs.username,
      type: "signin",
      data: { count: getDataFromRedis.data.data.count + 1 },
      expired: getDataFromRedis.data.expired
    });
  } else if (
    getDataFromRedis &&
    getDataFromRedis.data.data &&
    getDataFromRedis.data.data.count >= 4 &&
    getDataFromRedis.data.expired < new Date().getTime()
  ) {
    await sails.helpers.setRedis.with({
      key: inputs.username,
      type: "signin",
      data: { count: 1 },
      expired
    });
  }
}

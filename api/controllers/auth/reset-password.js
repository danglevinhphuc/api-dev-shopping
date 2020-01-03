const bcrypt = require("bcrypt-nodejs");
module.exports = {
  friendlyName: 'reset pass ',
  description:'reset pass description',
  inputs:{
    username : {type: 'string' , required : true},
    otp: {type : 'string',required:true},
    password: {type: 'string',required: true},
    email: {type: 'string',required: true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var _this = this;
    let user = await User.findOne({ username: inputs.username });
    if(user){
      if(user.expiredForgot >= new Date().getTime() && user.codeForgot == inputs.otp ){
        var password = inputs.password;
        return bcrypt.genSalt(10, function(err, salt) {
          return bcrypt.hash(password, salt, null, async function(err, hash) {
            if (err) return console(err);
            password = hash;
            data = await User.update({ id: user._id },{password: password, expiredForgot :0}).fetch();
            await sails.helpers.historyActive.with({
              objectType: "reset-password",
              data:inputs,
              createdBy: inputs.username
            });
            return exits.success({success:true});
          });
        });

      }else{
        return exits.success({success: false,error: 'OTP unexpired'})
      }
    }else{
      return exits.success({success: false,error: 'Username not existed'})
    }
  }
}

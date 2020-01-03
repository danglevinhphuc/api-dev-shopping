module.exports = {
  friendlyName: 'forgot pass ',
  description:'forgot pass description',
  inputs:{
    email: {type: 'string',required: true},
    username : {type: 'string' , required : true}
  },
  exits: {},
  fn: async function(inputs,exits){
    var _this = this;
    let user = await User.findOne({ username: inputs.username });
    if(user){
      var otp= Math.floor(Math.random()*8999+1000);
      var today = new Date();
      var exprired = today.setHours(today.getHours() + 1);
      var objectSession = {
        otp,
        email: inputs.email,
        username: inputs.username,
        exprired
      };
      if(user.codeForgot && user.expiredForgot  >= new Date().getTime()){
        await sails.helpers.sendOtp.with({otp: user.codeForgot,username : inputs.username,email: inputs.email, isGenerate: false,subject: 'OTP Reset Password'});
      }else{
        data = await User.update(
          {id: user._id},
          {
            codeForgot: objectSession.otp,
            expiredForgot: objectSession.exprired
          }
        ).fetch();
        await sails.helpers.sendOtp.with({otp: objectSession.otp,username : inputs.username,email: inputs.email, isGenerate: false,subject: 'OTP Reset Password'});
      }
      await sails.helpers.historyActive.with({
        objectType: "forgot-password",
        data: inputs,
        createdBy: inputs.username
      })
      return exits.success({success:true})
    }else{
      return exits.success({success:false, error: 'Username not existed'});
    }
  }
}


module.exports = {
  friendlyName: 'resend otp',
  description:'Resend otp description',
  inputs:{
    username: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    var user = await User.findOne({ username: inputs.username });
    if(user){
      await sails.helpers.sendOtp.with({otp: user.otp,username : inputs.username,email: user.emailAddress});
      await sails.helpers.historyActive.with({
        objectType: "resend-otp",
        data:inputs.username,
        createdBy: inputs.username
      });
      return exits.success({success:true });
    }else{
      return exits.success({success:false , error: 'Username not exists'});
    }
  }
}

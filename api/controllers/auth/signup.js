
module.exports = {
  friendlyName: 'Sign up',
  description:'Sign up description',
  inputs:{
    email: {type: 'string',required : true},
    username: {type: 'string',required: true},
    password: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = {};
    let checkUserExited = await User.findOne({ username: inputs.username });
    if(!checkUserExited){
      var otp= Math.floor(Math.random()*8999+1000)
      data = await User.create(
        {
          emailAddress: inputs.email,
          username: inputs.username,
          password: inputs.password,
          otp
        }
      ).fetch();
      await sails.helpers.sendOtp.with({otp,username : inputs.username,email: inputs.email});
      await sails.helpers.historyActive.with({
        objectType: "sign-up",
        data : inputs,
        createdBy: inputs.username
      })
      if(data && data['otp']){
        delete data['otp'];
      }
      return exits.success({success:true , data});
    }else{
      return exits.success({success:false , error: 'Username already exists'});
    }
  }
}

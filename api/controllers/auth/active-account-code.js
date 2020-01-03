module.exports = {
  friendlyName: 'active-account',
  description:'active-account description',
  inputs:{
    otp: {type: 'string',required: true},
    username: {type: 'string',required: true},
  },
  exits: {},
  fn: async function(inputs,exits){
    var user = await User.findOne({ username: inputs.username });
    if(user && user.otp == inputs.otp && !user.isActive){
      await User.update(
        {id: user.id},
        {
          isActive: true
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        objectType: "active-account-code",
        data: inputs,
        createdBy: inputs.username
      })
      await sails.helpers.autoGenerateMenu.with({username: inputs.username});
      await sails.helpers.autoGenerateIcon.with({username: inputs.username});
      return exits.success({success: true})
    }
    return exits.success({success: false})
  }
}

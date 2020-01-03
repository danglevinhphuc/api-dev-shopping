module.exports = {
  friendlyName: 'active-account generate',
  description:'active-account generate description',
  inputs:{
    generateLink: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    var data = Buffer.from(inputs.generateLink, 'base64').toString('ascii');
    var parseDataToJson = JSON.parse(data);
    if(parseDataToJson){
      var user = await User.findOne({ username: parseDataToJson.username });
      if(user && user.otp == parseDataToJson.otp && !user.isActive){
        await User.update(
          {id: user.id},
          {
            isActive: true
          }
        ).fetch();
        await sails.helpers.historyActive.with({
          objectType: "active-account-code",
          data: inputs,
          createdBy: user.username
        })
        await sails.helpers.autoGenerateMenu.with({username: user.username});
        await sails.helpers.autoGenerateIcon.with({username: inputs.username});
        return exits.success({success: true})
      }
    }
    return exits.success({success: false})
  }
}

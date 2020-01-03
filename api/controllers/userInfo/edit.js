
module.exports = {
  friendlyName: 'Edit',
  description:'Edit user',
  inputs:{
    id: {type: 'string',required : true},
    fullName : {type: 'string',allowNull: true},
    phone : {type: 'string',allowNull: true},
    linkFb : {type: 'string',allowNull: true},
    linkTwitter : {type: 'string',allowNull: true},
    linkGooglePlus : {type: 'string',allowNull: true},
    linkInstagram : {type: 'string',allowNull: true},
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = {};
    let exist = await User.findOne({ id: inputs.id });
    if(exist){
      // update data
      data = await User.update(
        {id: inputs.id},
        {
          fullName: inputs.fullName,
          phone: inputs.phone,
          linkFb: inputs.linkFb,
          linkTwitter: inputs.linkTwitter,
          linkGooglePlus: inputs.linkGooglePlus,
          linkInstagram: inputs.linkInstagram,
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "edit",
        objectType: "userInfo",
        data: inputs,
        createdBy: this.req.username
      })
    }
    return exits.success(data);
  }
}

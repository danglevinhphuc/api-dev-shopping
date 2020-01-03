module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    username: { type: 'string', required: true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var dataDefault = ["fa fa-facebook","fa fa-twitter","fa fa-youtube","fa fa-google"];
    for(let i = 0; i <dataDefault.length;i++){
      var data = await IconHeader.create(
        {
          name: dataDefault[i],
          link: '',
          position: i+1,
          isActive : true,
          username : inputs.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "Icon-Header",
        data: data,
        createdBy: inputs.username
      });
    }
    return exits.success({success: true,type: "icon-header-generate"});
  }
}


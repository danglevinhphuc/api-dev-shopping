module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    username: { type: 'string', required: true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var dataDefault = ["Home","About","Service","Contact"];
    for(let i = 0; i <dataDefault.length;i++){
      var data = await Menu.create(
        {
          parent: dataDefault[i],
          linkParent: '',
          child: [],
          position: i+1,
          isActive : true,
          username : inputs.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "menu",
        data: data,
        createdBy: inputs.username
      });
    }
    return exits.success({success: true,type: "menu-generate"});
  }
}


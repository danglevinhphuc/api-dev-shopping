
module.exports = {
  friendlyName: 'Edit',
  description:'Edit Menu',
  inputs:{
    id: { type: "string", allowNull: true },
    parent: { type: 'string', required: true },
    linkParent:{type: 'string', allowNull: true},
    position:{type: 'string', required: true},
    child:  { type: 'json', defaultsTo : [] },
    isActive: { type: "boolean", defaultsTo:true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var _this =this;
    let data = {};
    if(inputs.id){
      let exist = await Menu.findOne({ id: inputs.id });
      if(exist){
        // update data
        data = await Menu.update(
          {id: inputs.id},
          {
            parent: inputs.parent,
            linkParent: inputs.linkParent,
            child: inputs.child,
            position: inputs.position,
            isActive : inputs.isActive,
          }
        ).fetch();
        data = _.head(data);
        await sails.helpers.historyActive.with({
          type: "edit",
          objectType: "menu",
          data: inputs,
          createdBy: _this.req.username
        });
      }
    }else{
      data = await Menu.create(
        {
          parent: inputs.parent,
          linkParent: inputs.linkParent,
          child: inputs.child,
          position: inputs.position,
          isActive : inputs.isActive,
          username : this.req.headers.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "menu",
        data: inputs,
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
}


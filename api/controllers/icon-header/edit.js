
module.exports = {
  friendlyName: 'Edit',
  description:'Edit Icon header',
  inputs:{
    name: { type: 'string', required: true },
    link:{type: 'string',  allowNull: true},
    position:{type: 'number', required: true},
    isActive: { type: "boolean", defaultsTo:true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var _this =this;
    let data = {};
    if(inputs.id){
      let exist = await IconHeader.findOne({ id: inputs.id });
      if(exist){
        // update data
        data = await IconHeader.update(
          {id: inputs.id},
          {
            name: inputs.name,
            link: inputs.link,
            position: inputs.position,
            isActive : inputs.isActive,
          }
        ).fetch();
        data = _.head(data);
        await sails.helpers.historyActive.with({
          type: "edit",
          objectType: "Icon-Header",
          data: inputs,
          createdBy: _this.req.username
        });
      }
    }else{
      data = await IconHeader.create(
        {
          name: inputs.name,
          link: inputs.link,
          position: inputs.position,
          isActive : inputs.isActive,
          username : this.req.headers.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "Icon-Header",
        data: inputs,
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
}


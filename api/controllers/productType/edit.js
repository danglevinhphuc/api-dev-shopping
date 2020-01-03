
module.exports = {
  friendlyName: 'Edit',
  description:'Edit product type',
  inputs:{
    id: { type: "string", allowNull: true },
    origin:{type: "string",allowNull: true },
    name:{type: "string",required: true },
    isActive: {type: "boolean", defaultsTo: false}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = {};
    var _this =this;
    if(inputs.id){
      let exist = await ProductType.findOne({ id: inputs.id });
      if(exist){
        // update data
        data = await ProductType.update(
          {id: inputs.id},
          {
            name: inputs.name,
            origin: inputs.origin,
            isActive: inputs.isActive,
          }
        ).fetch();
        data = _.head(data);
        await sails.helpers.historyActive.with({
          type: "edit",
          objectType: "productType",
          data: inputs,
          createdBy: _this.req.username
        });
      }
    }else{
      data = await ProductType.create(
        {
          name: inputs.name,
          origin: inputs.origin,
          isActive: inputs.isActive,
          username : this.req.headers.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "productType",
        data: inputs,
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
}


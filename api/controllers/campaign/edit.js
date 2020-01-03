
module.exports = {
  friendlyName: 'Edit',
  description:'Edit Campaign',
  inputs:{
    id: { type: "string", allowNull: true },
    name: { type: 'string', required: true },
    startTime: { type: 'number', required : true },
    endTime: { type: 'number', required : true },
    products : { type: 'json', defaultsTo : [] },
    isActive : {type: 'boolean', defaultsTo: false},
  },
  exits: {},
  fn: async function(inputs,exits){
    var _this =this;
    let data = {};
    if(inputs.id){
      let exist = await Campaign.findOne({ id: inputs.id });
      if(exist){
        // update data
        data = await Campaign.update(
          {id: inputs.id},
          {
            name: inputs.name,
            startTime: inputs.startTime,
            endTime: inputs.endTime,
            products : inputs.products,
            isActive : inputs.isActive,
          }
        ).fetch();
        await sails.helpers.historyActive.with({
          type: "edit",
          objectType: "campaign",
          data: inputs,
          createdBy: _this.req.username
        });
      }
    }else{
      data = await Campaign.create(
        {
          name: inputs.name,
          startTime: inputs.startTime,
          endTime: inputs.endTime,
          products : inputs.products,
          isActive : inputs.isActive,
          username : this.req.headers.username
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "create",
        objectType: "campaign",
        data: inputs,
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
}


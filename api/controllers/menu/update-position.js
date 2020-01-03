
module.exports = {
  friendlyName: "Update",
  description: "Update postion menu",
  inputs: {
    list: { type: "json", defaultsTo: [] }
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    var _this =this;
    let data = [];
    if (inputs.list.length) {
      // update data
      for(let i = 0 ; i< inputs.list.length; i++){
        let menuUpdatePostion = await Menu.update(
          {id: inputs.list[i].id},
          {
            position: inputs.list[i].position
          }
        ).fetch();
        menuUpdatePostion = _.head(menuUpdatePostion);
        data.push(menuUpdatePostion);
      }
      await sails.helpers.historyActive.with({
        type: "update-position",
        objectType: "menu",
        data: inputs.list,
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
};

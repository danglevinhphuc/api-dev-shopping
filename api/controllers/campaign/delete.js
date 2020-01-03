
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE campaign",
  inputs: {
    ids: { type: "json", defaultsTo: [] }
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    var _this =this;
    let data = {};
    if (inputs.ids.length) {
      // update data
      data = await Campaign.update(
        { id: inputs.ids },
        {
          isDelete: true
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "delete",
        objectType: "campaign",
        data: {ids :ids},
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
};

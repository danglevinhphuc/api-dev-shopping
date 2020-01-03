
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE Icon Header",
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
      data = await IconHeader.update(
        { id: inputs.ids },
        {
          isDelete: true
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "delete",
        objectType: "Icon-Header",
        data: {ids :ids},
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
};

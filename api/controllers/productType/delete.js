
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE product type",
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
    let data = {};
    var _this =this;
    if (inputs.ids.length) {
      // update data
      data = await ProductType.update(
        { id: inputs.ids },
        {
          isDelete: true
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "delete",
        objectType: "productType",
        data: {ids: ids},
        createdBy: _this.req.username
      });
    }
    return exits.success(data);
  }
};

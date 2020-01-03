
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE product",
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
    let productData = {};
    if (inputs.ids.length) {
      // update data
      productData = await Product.update(
        { id: inputs.ids },
        {
          isDelete: true
        }
      ).fetch();
      await sails.helpers.historyActive.with({
        type: "delete",
        objectType: "product",
        data: {ids :inputs.ids},
        createdBy: _this.req.username
      });
    }
    return exits.success(productData);
  }
};

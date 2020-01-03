
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE product",
  inputs: {
    id: { type: "string", required: true },
    linkDelete: {type: 'string', required: true}
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    let data = {};
    if (inputs.id.length) {
      // update data
      let productData = await Product.findOne({ id: inputs.id });
      if(productData){
        var imagesFilter = productData.images.filter(o =>{return o != inputs.linkDelete});
        data = await Product.update(
          { id: inputs.id },
          {
            images:imagesFilter
          }
        ).fetch();
        await sails.helpers.historyActive.with({
          type: "delete-image",
          objectType: "product",
          data: inputs,
          createdBy: _this.req.username
        });
      }
    }
    return exits.success(data);
  }
};

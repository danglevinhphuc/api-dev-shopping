var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "phuc-company",
  api_key: "838986499921257",
  api_secret: "24nudYVIDiv2F03axjKBbYP_eHY"
});
module.exports = {
  friendlyName: "Edit",
  description: "Edit product",
  inputs: {
    id: { type: "string", allowNull: true },
    name: { type: "string", required: true },
    price: { type: "string", required: true },
    type: {type: 'json',defaultsTo: {}},
    isActive: { type: "boolean", defaultsTo: false }
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
    await this.req.file("images").upload({ maxBytes: 100000 }, async function(err, uploadedFiles) {
      var arrayImageUrl = [];
      if (err) {
        return exits.badRequest("No file was uploaded or max size 100000");
      }
      if (uploadedFiles.length === 0) {
        arrayImageUrl = [];
      } else {
        // await uploadedFiles.forEach(async (element) => {
        for (let item of uploadedFiles) {
          await cloudinary.uploader.upload(
            item.fd,
            async function(result) {
              arrayImageUrl.push(result.url);
            },
            { folder: "products" }
          );
        }
      }
      if (inputs.id) {
        // update data
        let productData = await Product.findOne({ id: inputs.id });
        data = await Product.update(
          { id: inputs.id },
          {
            name: inputs.name,
            price: inputs.price,
            type: JSON.parse(inputs.type),
            images:
              productData && productData.images && productData.images.length
                ? arrayImageUrl.concat(productData.images)
                : productData.images,
            isActive: inputs.isActive
          }
        ).fetch();
        await sails.helpers.historyActive.with({
          type: "update",
          objectType: "product",
          data: _.head(data),
          createdBy: _this.req.username
        });
      } else {
        data = await Product.create({
          name: inputs.name,
          price: inputs.price,
          images: arrayImageUrl,
          type: JSON.parse(inputs.type),
          isActive: inputs.isActive,
          username : _this.req.username
        }).fetch();
        await sails.helpers.historyActive.with({
          type: "create",
          objectType: "product",
          data: data,
          createdBy: _this.req.username
        });
      }
      return exits.success(data);
    });
  }
};

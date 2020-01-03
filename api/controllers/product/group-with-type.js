module.exports = {
  friendlyName: "Group with type",
  description: "Group with type",
  inputs: {
    ids: { type: "json", required: true },
    limit: { type: "number", defaultTo: 10 },
    sort: {
      type: "ref",
      defaultTo: { createdAt: -1 }
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let db = Product.getDatastore().manager;
    let collection = db.collection(Product.tableName);
    if(_.isEmpty(inputs.sort)){
      inputs.sort = {createdAt: 1};
    }
    let aggregate = [
      {
        $match: {
          "type.value": {
            $in: inputs.ids
          },
          username: this.req.headers.username
        }
      },
      { $sort: { [Object.keys(inputs.sort)[0]]: inputs.sort[Object.keys(inputs.sort)[0]] } },
      {
        $group: {
          _id: { type: "$type.value" },
          data: { $push: { name: "$name", price: "$price", images: "$images" } }
        }
      },
      {
        $project: {
          _id: 1,
          data: { $slice: ["$data", inputs.limit ? inputs.limit : 5] }
        }
      }
    ];
    let result = await collection.aggregate(aggregate).toArray();
    return exits.success(result);
  }
};

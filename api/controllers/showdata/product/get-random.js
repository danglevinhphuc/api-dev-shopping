module.exports = {
  friendlyName: 'GET By query Product random',
  description:'GET query product random',
  inputs:{
    size:{
      type: 'number',
      example: 0,
      defaultTo: 10,
      max: 100
    },
    query:{
      type: 'json',
      defaultTo:{}
    }
  },
  exits: {},
  fn: async function(inputs,exits){
    if(_.isEmpty(inputs.sort)){
      inputs.sort = {createdAt: -1};
    }
    let db = Product.getDatastore().manager;
    let collection = db.collection(Product.tableName);
    let result = await collection.aggregate(
      [{ "$sample": { size: inputs.size } },inputs.query]
    );
    let data = await result.toArray();
    return exits.success({
      size: inputs.size,
      data
    })
  }
}

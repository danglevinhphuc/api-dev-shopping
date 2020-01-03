module.exports = {
  friendlyName: 'GET By query Campaign type',
  description:'GET query Campaign type',
  inputs:{
    from:{
      type: 'number',
      example: 0,
      defaultTo: 0
    },
    size:{
      type: 'number',
      example: 0,
      defaultTo: 10,
      max: 100
    },
    query:{
      type: 'json',
      defaultTo:{}
    },
    sort:{
      type: 'ref',
      defaultTo: {createdAt: -1}
    },
  },
  exits: {},
  fn: async function(inputs,exits){
    if(_.isEmpty(inputs.sort)){
      inputs.sort = {createdAt: -1};
    }
    let db = Campaign.getDatastore().manager;
    let collection = db.collection(Campaign.tableName);
    inputs.query['username'] = this.req.headers.username;
    let result = await collection.find(inputs.query);
    let [total , data] = await Promise.all([
      result.count(),
      result
        .sort(inputs.sort)
        .limit(inputs.size)
        .skip(inputs.from)
        .toArray()
    ]);
    return exits.success({
      from : inputs.from,
      size: inputs.size,
      total,
      data
    })
  }
}

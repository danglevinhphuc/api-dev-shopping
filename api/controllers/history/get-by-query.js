module.exports = {
  friendlyName: 'GET By query History type',
  description:'GET query History type',
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
    let db = History.getDatastore().manager;
    let collection = db.collection(History.tableName);
    inputs.query['createdBy'] = this.req.headers.username;
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

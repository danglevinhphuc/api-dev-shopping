module.exports = {
  friendlyName: 'GET By query suggestion',
  description:'GET query suggestion',
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
      max: 10
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
    let db = Suggestion.getDatastore().manager;
    let collection = db.collection(Suggestion.tableName);
    let result = await collection.find(inputs.query);
    let data = await result
    .sort(inputs.sort)
    .limit(inputs.size)
    .skip(inputs.from)
    .toArray();
    return exits.success({
      from : inputs.from,
      size: inputs.size,
      data
    })
  }
}

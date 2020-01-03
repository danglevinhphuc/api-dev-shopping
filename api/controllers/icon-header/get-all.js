module.exports = {
  friendlyName: 'GET By query Icon header',
  description:'GET query Icon header',
  inputs:{
    sort:{
      type: 'ref',
      defaultTo: {position: 1}
    },
    query:{
      type: 'json',
      defaultTo: {}
    }
  },
  exits: {},
  fn: async function(inputs,exits){
  if(_.isEmpty(inputs.sort)){
      inputs.sort = {position: 1};
    }
    if(_.isEmpty(inputs.query)){
      inputs.query = {};
    }
    inputs.query['username'] = this.req.username;
    let db = IconHeader.getDatastore().manager;
    let collection = db.collection(IconHeader.tableName);
    let result = await collection.find(inputs.query);
    let data= await result.sort(inputs.sort).toArray();
    return exits.success({
      data
    })
  }
}

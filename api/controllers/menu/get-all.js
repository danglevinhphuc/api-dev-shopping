module.exports = {
  friendlyName: 'GET By query Menu type',
  description:'GET query Menu type',
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
    let db = Menu.getDatastore().manager;
    let collection = db.collection(Menu.tableName);
    let result = await collection.find(inputs.query);
    let data= await result.sort(inputs.sort).toArray();
    return exits.success({
      data
    })
  }
}

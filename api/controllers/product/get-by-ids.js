
module.exports = {
  friendlyName: 'GET',
  description:'GET product id',
  inputs:{
    ids: {type: 'json',defaultsTo: [] }
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await ProductType.find({id: inputs.ids,username:this.req.headers.username})
    return exits.success(data);
  }
}

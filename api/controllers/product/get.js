module.exports = {
  friendlyName: 'GET',
  description:'GET product',
  inputs:{
    id: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await Product.findOne({ id: inputs.id })
    return exits.success(data);
  }
}

module.exports = {
  friendlyName: 'GET',
  description:'GET product type',
  inputs:{
    id: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await ProductType.findOne({ id: inputs.id })
    return exits.success(data);
  }
}

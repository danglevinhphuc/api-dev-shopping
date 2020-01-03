module.exports = {
  friendlyName: 'GET',
  description:'GET Campaign',
  inputs:{
    id: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await Campaign.findOne({ id: inputs.id })
    return exits.success(data);
  }
}

module.exports = {
  friendlyName: 'GET',
  description:'GET Menu ',
  inputs:{
    id: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await Menu.findOne({ id: inputs.id })
    return exits.success(data);
  }
}

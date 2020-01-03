module.exports = {
  friendlyName: 'GET',
  description:'GET Icon Header ',
  inputs:{
    id: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = await IconHeader.findOne({ id: inputs.id })
    return exits.success(data);
  }
}

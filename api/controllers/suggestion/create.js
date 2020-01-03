module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    ip: {type: 'string',required: true},
    value: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    let response = await sails.helpers.createSuggestion.with(inputs);
    return exits.success(response);
  }
}

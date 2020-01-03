module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    type: { type: 'string', allowNull : true },
    objectType: { type: 'string', required : true },
    data : { type: 'json', defaultsTo : [] },
    createdBy : { type: 'string', required: true },
  },
  exits: {},
  fn: async function(inputs,exits){
    await History.create(inputs).fetch();
    return exits.success()
  }
}


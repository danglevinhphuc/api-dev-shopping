module.exports = {
  friendlyName: 'Sign up',
  description:'Sign up description',
  inputs:{
    token: {type: 'string',required : true},
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = {};
    data = await sails.helpers.verifyToken.with({ token: inputs.token});
    return exits.success(data);
  }
}

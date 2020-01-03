const axios = require('axios')
module.exports = {
  friendlyName: 'Send webhook',
  description:'Send webhook',
  inputs:{
    data: {type: 'json',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    await axios.post(`${sails.config.custom.webhookUrl}`,{data: inputs.data});
    return exits.success();
  }
}


const axios = require('axios')
module.exports = {
  friendlyName: 'Send',
  description:'Send chat ',
  inputs:{
    message: { type: 'string', allowNull : true },
    from: { type: 'string', allowNull : true },
    to : { type: 'string', allowNull : true },
    email : { type: 'string', required: true },
    type : { type: 'string', required: true }
  },
  exits: {},
  fn: async function(inputs,exits){
    await axios.post(`${sails.config.custom.webhookSendChatAdmin}`,{data: inputs});
    return exits.success()
  }
}


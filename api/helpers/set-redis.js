var redis = require('redis');
var md5 = require('md5');
var client = redis.createClient(sails.config.custom.redis.port,sails.config.custom.redis.host);
client.auth(sails.config.custom.redis.password);
client.on("error", err => {
  console.log("Error " + err);
});
module.exports = {
  friendlyName: 'Set redis',

  description: '',

  inputs: {
    key: { type: 'string', required: true },
    type :{ type: 'string', required: true },
    data: { type: 'json', required: true },
    expired: {type : 'number', allowNull: true}
  },

  exits: {},

  fn: function(inputs, exits) {
    try {
      var md5Data = md5(JSON.stringify({key: inputs.key,type: inputs.type}));
      var formData = {data: inputs.data};
      if(inputs.expired){
        formData.expired = inputs.expired;
      }
      client.set(`folder:${md5Data}`, JSON.stringify(formData));
      return exits.success({success: true});
    } catch (error) {
      return exits.success({success: false, error: JSON.stringify(error)});
    }
  }
}

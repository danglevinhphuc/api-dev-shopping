var redis = require('redis');
var md5 = require('md5');
var client = redis.createClient(sails.config.custom.redis.port,sails.config.custom.redis.host);
client.auth(sails.config.custom.redis.password);
client.on("error", err => {
  console.log("Error ");
});
module.exports = {
  friendlyName: 'Get redis',

  description: '',

  inputs: {
    key: { type: 'json', required: true }
  },

  exits: {},

  fn: function(inputs, exits) {
    var md5Data = md5(JSON.stringify(inputs.key));
    return client.get(`folder:${md5Data}`, async (err, value) => {
      if (value) {
        return exits.success({data: JSON.parse(value)});
      }else{
        return exits.success({data: null});
      }
    });
  }
}

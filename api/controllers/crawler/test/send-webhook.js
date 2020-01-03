module.exports = {
  friendlyName: "send-webhook",

  description: "",

  inputs: {
    data: {type: 'json',required: true}
  },

  exits: {},

  fn: async function(inputs, exits) {
    await sails.helpers.sendWebhook.with({
      "data":"abcd"
    });
    return exits.success();
  }
};

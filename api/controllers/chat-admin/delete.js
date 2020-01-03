
module.exports = {
  friendlyName: "DELETE",
  description: "DELETE chat",
  inputs: {
    ids: { type: "json", defaultsTo: [] }
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    var _this =this;
    let chatData = {};
    if (inputs.ids.length) {
      // update data
      chatData = await Chat.update(
        { id: inputs.ids },
        {
          isDelete: true
        }
      ).fetch();
      if(chatData && chatData.length){
        var dataSendChat = _.head(chatData);
        await sails.helpers.sendChatAdmin.with({
          message: dataSendChat.message,
          type: "delete",
          to: dataSendChat.to,
          email: _this.req.username
        });
      }
      await sails.helpers.historyActive.with({
        type: "delete",
        objectType: "chat",
        data: {ids :inputs.ids},
        createdBy: _this.req.username
      });
    }
    return exits.success(chatData);
  }
};

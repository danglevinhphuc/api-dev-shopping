
module.exports = {
  friendlyName: 'Create',
  description:'Create chat',
  inputs:{
    id: { type: "string", allowNull: true },
    message: { type: "string", required: true },
    from: { type: "string", required: true },
    to: { type: "string", required: true }
  },
  exits: {},
  fn: async function(inputs,exits){
    let data = {};
    var _this =this;
    if(inputs.id){
      let exist = await Chat.findOne({ id: inputs.id });
      if(exist){
        // update data
        data = await Chat.update(
          {id: inputs.id},
          {
            message: inputs.message,
            from: inputs.from,
            to: inputs.to,
            email:  _this.req.username
          }
        ).fetch();
        await sails.helpers.sendChatAdmin.with({
          message: inputs.message,
          type: "update",
          to: inputs.to,
          email: _this.req.username
        });
        await sails.helpers.createUserChat.with({email:  inputs.to,profile: {snippet: inputs.message,isUser : false}, owner:_this.req.username});
      }
    }else{
      data = await Chat.create(
        {
          message: inputs.message,
          from: inputs.from,
          to: inputs.to,
          email:  _this.req.username,
          username: _this.req.username
        }
      ).fetch();
      await sails.helpers.sendChatAdmin.with({
        message: inputs.message,
        type: "create",
        to: inputs.to,
        email: _this.req.username
      });
      await sails.helpers.createUserChat.with({email: inputs.to,profile: {snippet: inputs.message,isUser : false}, owner:_this.req.username});
    }
    return exits.success(data);
  }
}


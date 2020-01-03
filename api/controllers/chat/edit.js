
module.exports = {
  friendlyName: 'Create',
  description:'Create chat',
  inputs:{
    id: { type: "string", allowNull: true },
    message: { type: "string", required: true },
    email: { type: "string", required: true },
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
            email: inputs.email
          }
        ).fetch();
        await sails.helpers.sendChat.with({
          message: inputs.message,
          type: "update",
          to: inputs.to,
          email: inputs.email
        });
        await sails.helpers.createUserChat.with({email: inputs.email,profile: {snippet: inputs.message,isUser : true},owner: inputs.to});
      }
    }else{
      data = await Chat.create(
        {
          message: inputs.message,
          from: inputs.from,
          to: inputs.to,
          email: inputs.email,
          username: inputs.to
        }
      ).fetch();
      await sails.helpers.sendChat.with({
        message: inputs.message,
        type: "create",
        to: inputs.to,
        email: inputs.email
      });
      await sails.helpers.createUserChat.with({email: inputs.email,profile: {snippet: inputs.message,isUser : true },owner: inputs.to});
    }
    return exits.success(data);
  }
}


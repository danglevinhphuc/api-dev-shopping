module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    email: { type: 'string', required : true },
    profile: { type: 'json', defaultsTo : {} },
    owner: { type: 'string', required : true }
  },
  exits: {},
  fn: async function(inputs,exits){
    var userChat = await Conversation.find(
      {
        email: inputs.email,
        owner: inputs.owner
      });
    if(!userChat || (userChat && !userChat.length)){
      await Conversation.create(inputs);
    }else{
      await Conversation.update(
        {id: _.head(userChat).id},
        {
          profile: inputs.profile
        }
      ).fetch();
    }
    return exits.success()
  }
}


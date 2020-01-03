module.exports = {
  friendlyName: 'Create',
  description:'Create suggestion',
  inputs:{
    ip: {type: 'string',required: true},
    value: {type: 'string',required: true}
  },
  exits: {},
  fn: async function(inputs,exits){
    var data = null;
    var checkValidExit = await Suggestion.find({ip : inputs.ip,value: inputs.value.toLocaleLowerCase()});
    if(checkValidExit && !checkValidExit.length){
      var data = await Suggestion.create({
        ip: inputs.ip,
        value : inputs.value.toLocaleLowerCase()
      }).fetch();
    }
    return exits.success(data)
  }
}


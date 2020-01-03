const uuidv1 = require("uuid/v1");
module.exports = {
  friendlyName: "Verify Token",

  description: "",

  inputs: {
    name: { type: "string", required: true },
    id : {type: "string",allowNull: true}
  },

  exits: {},

  fn: async function(inputs, exits) {
    var admin = await sails.helpers.getFirebase.with({name: "[DEFAULT]"});
    let db = admin.firestore();
    if(inputs.id){
      let collection = db.collection("users").doc(inputs.id);
      collection.update({
        name: inputs.name,
        updatedAt: new Date()
      });
    }else{
      let collection = db.collection("users").doc(uuidv1());
      collection.set({
        name: inputs.name,
        createdAt: new Date()
      });
    }
    return exits.success();
  }
};

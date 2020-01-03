module.exports = {
  friendlyName: 'Get by query',

  description: '',

  inputs: {
    from: {
      type: 'number',
      example: 0,
      defaultsTo: 0
    },
    size: {
      type: 'number',
      example: 0,
      defaultsTo: 10,
      max: 100
    },
    query: {
      type: 'json',
      defaultsTo: {}
    },
    sort: {
      type: 'ref',
      defaultsTo: { createdAt: "desc" }
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    var data = [];
    var admin = await sails.helpers.getFirebase.with({name: "[DEFAULT]"});
    let db = admin.firestore();
    let collection = db.collection('users');
    let query = await collection
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    if(query){
      // let last = query.docs[query.docs.length - 1];
      // let next = await db.collection('users')
      // .orderBy('createdAt', 'desc')
      // .startAfter(last.data().createdAt)
      // .limit(1).get();
      // if(next){
      //   next.forEach(function(doc) {
      //         data.push(doc.data())
      //   });
      // }
      query.forEach(function(doc) {
            data.push(doc.data())
            // console.log(doc.data());
      });
    }
    return exits.success(data)
  }
}

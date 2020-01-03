const firebase = require('firebase-admin')
const config = sails.config.custom.firebase
module.exports = {
  friendlyName: 'Get firebase',

  description: '',

  inputs: {
    name: { type: 'string', allowNull: true }
  },

  exits: {
    success: {
      outputFriendlyName: 'Firebase',
      outputType: 'ref'
    }
  },

  fn: async function(inputs, exits) {
    // Get firebase.
    var app = _.find(firebase.apps, { name: inputs.name })
    if (!app) {
      switch (inputs.name) {
        case '[DEFAULT]':
          app = firebase.initializeApp({
            credential: firebase.credential.cert(config.credential),
            databaseURL: config.url
          })
          break
        default:
          app = firebase.initializeApp({
            credential: firebase.credential.cert(config.credential),
            databaseURL: config.url
          })
          break
      }
    }
    // TODO

    // Send back the result through the success exit.
    return exits.success(app)
  }
}

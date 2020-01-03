/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcrypt-nodejs");
module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: "string",
      unique: true,
      required: true
    },
    username: {
      type: "string",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    },
    images:{
      type: "string",
      allowNull: true
    },
    fullName:{
      type: "string",
      allowNull: true
    },
    phone:{
      type: "string",
      allowNull: true
    },
    linkFb:{
      type: "string",
      allowNull: true
    },
    linkTwitter:{
      type: "string",
      allowNull: true
    },
    linkGooglePlus:{
      type: "string",
      allowNull: true
    },
    linkInstagram:{
      type: "string",
      allowNull: true
    },
    otp:{
      type: "number",
      allowNull: true
    },
    isActive: {
      type: "boolean",
      allowNull: false
    },
    codeForgot:{
      type: "number",
      allowNull: true
    },
    expiredForgot:{
      type: "number",
      allowNull: true
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  customToJSON: function() {
    return _.omit(this, ["password"]);
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  },
  comparePassword: function(password, user, cb) {
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};

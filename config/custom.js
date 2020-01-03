
/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  cloudinary:{
    cloud_name: "phuc-company",
    api_key: "838986499921257",
    api_secret: "24nudYVIDiv2F03axjKBbYP_eHY"
  },
  email:{
   user: "spcartonline@gmail.com",
   pass:"Tm6ch2Tw"
  },
  urlRedirect: 'https://front-end-dev-shopping.herokuapp.com/',
  firebase: {
    credential: require('../secret/service-account-firebase.json'),
    url: 'https://react-realtime-22d13.firebaseio.com',
  },
  webhookUrl:"https://front-end-dev-shopping.herokuapp.com/webhook/aHR0cHM6Ly9mcm9udC1lbmQtZGV2LXNob3BwaW5nLmhlcm9rdWFwcC5jb20v",
  webhookSendChatAdmin: "https://fe-client-shopping-cart.herokuapp.com/webhook/cb6433d48a4d94a51d0184718e66eb5e56b6c44d05576111c283f5adc409007d",
  tokenjwt: "e563b96dadb800b4916a18fcb070c778",
  redis:{
    port: '12403',
    host: 'redis-12403.c89.us-east-1-3.ec2.cloud.redislabs.com',
    password: 'O2HTmSvAVE0EzAO3AVOTAc7vvU9eUaqk'
  }
};

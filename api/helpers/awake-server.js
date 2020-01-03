const axios = require('axios')
module.exports = {
  friendlyName: 'Awake server',
  description:'Awake server',
  inputs:{
  },
  exits: {},
  fn: async function(inputs,exits){
    setInterval(function() {
      console.log("Connect now");
      actionFE();
      actionFESP();
      actionBESP();
    }, 60000);

    return exits.success()
  }
}

const actionFE = async () => {
  let response = await axios.post("https://front-end-dev-shopping.herokuapp.com/webhook/aHR0cHM6Ly9mcm9udC1lbmQtZGV2LXNob3BwaW5nLmhlcm9rdWFwcC5jb20v", {"status":true});
};
const actionFESP = async () => {
  let response = await axios.post("https://fe-client-shopping-cart.herokuapp.com/webhook/cb6433d48a4d94a51d0184718e66eb5e56b6c44d05576111c283f5adc409007d", {"status":true});
};
const actionBESP = async () => {
  try {
    var response = await axios.get("https://be-client-shopping-cart.herokuapp.com");
  } catch (error) {

  }
};

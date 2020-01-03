
module.exports = {
  friendlyName: "GET",
  description: "GET Template report",
  inputs: {
    fileName : {type: "string", required: true}
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    let file = `${require('path').resolve(sails.config.appPath,'assets/template/')}/${inputs.fileName}.xlsx`;
    this.res.attachment(inputs.fileName);
    let downloading = await sails.startDownload(file)
    return exits.success(downloading)
  }
};

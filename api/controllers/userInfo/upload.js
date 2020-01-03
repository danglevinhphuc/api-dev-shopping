var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'phuc-company',
  api_key: '838986499921257',
  api_secret: '24nudYVIDiv2F03axjKBbYP_eHY'
});
module.exports = {
  friendlyName: 'Upload',
  description:'Upload image',
  inputs:{
  },
  exits: {
    badRequest: {
      description: 'Invalid data',
      responseType: 'badRequest'
    }
  },
  fn: async function(inputs,exits){
    var _this= this;
    var userId = this.req.params.id;
    if(userId){
      this.req.file('images').upload({maxBytes: 100000},function (err, uploadedFiles) {
        if(err){
         return exits.badRequest('No file was uploaded or max size 100000');
        }
        if (uploadedFiles.length === 0){
          return exits.badRequest('No file was uploaded');
        }else{
          cloudinary.uploader.upload(uploadedFiles[0].fd, async function(result) {
            var user = await User.update(
              { id: userId },
              {
                images: result.url
              }
            ).fetch();
            await sails.helpers.historyActive.with({
              type: "upload",
              objectType: "userInfo",
              data: _.head(user),
              createdBy: _this.req.username
            })
            return exits.success(user);
          },{ folder: "user"});
        }
      });
    }else{
      return exits.error();
    }
  }
}

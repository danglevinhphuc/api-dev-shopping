const Excel = require('exceljs')
module.exports = {
  friendlyName: "IMPORT",
  description: "IMPORT product type",
  inputs: {},
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    if(this.req._fileparser.upstreams.length){
      let filePath = require('path').resolve(sails.config.appPath, 'assets/import/product-type')
      let filename = `import_product_type_${new Date().getTime()}.xlsx`
      var uploaded = await sails.uploadOne(this.req.file('file'), {
        dirname: filePath,
        saveAs: filename,
        maxBytes: 10000000
      });
      var workbook =new Excel.Workbook();
      await workbook.xlsx.readFile(uploaded.fd);
      var worksheet = workbook.getWorksheet('data');
      let data = [];
      let error = [];
      await worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        if(rowNumber !== 1){
          let obj = {
            name : row.getCell("A").value,
            origin : row.getCell("B").value,
            rowNumber
          }
          data.push(obj);
        }
      });
      for(let item of data){
        if(item.name && item.origin){
          await ProductType.create(
            {
              name: item.name,
              origin: item.origin,
              isActive: true,
              username : this.req.headers.username
            }
          ).fetch();
        }else{
          error.push({
            rowNumber: item.rowNumber
          })
        }
      }
      return exits.success(error)
    }
  }
};

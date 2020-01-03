const Excel = require('exceljs')
module.exports = {
  friendlyName: "IMPORT",
  description: "IMPORT product type",
  inputs: {
    from:{
      type: 'number',
      example: 0,
      defaultTo: 0
    },
    size:{
      type: 'number',
      example: 0,
      defaultTo: 10,
      max: 100
    },
    query:{
      type: 'json',
      defaultTo:{}
    },
    sort:{
      type: 'ref',
      defaultTo: {createdAt: -1}
    },
  },
  exits: {
    badRequest: {
      description: "Invalid data",
      responseType: "badRequest"
    }
  },
  fn: async function(inputs, exits) {
    if (_.isEmpty(inputs.sort)) {
      inputs.sort = { createdAt: -1 }
    }
    let db = ProductType.getDatastore().manager;
    let collection = db.collection(ProductType.tableName);
    inputs.query['username'] = this.req.headers.username;
    inputs.query['isDelete'] = false;
    let data = await collection
      .find(inputs.query)
      .sort(inputs.sort)
      .toArray();
    let fileName = `export_product_type_${new Date().getTime()}.xlsx`
    let filePath = `${require('path').resolve(sails.config.appPath, 'assets/export/product-type/')}/${fileName}`
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('data');
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Origin', key: 'origin', width: 20 },
      { header: 'Active', key: 'isActive', width: 20 },
    ]
    for (let item of data) {
      await worksheet.addRow({
        name: item.name,origin : item.origin,isActive: item.isActive ? `Active` : `Inactive`
      });
    };
    await workbook.xlsx.writeFile(filePath)
    this.res.attachment(fileName)
    var downloading = await sails.startDownload(filePath)
    return exits.success(downloading)
  }
};

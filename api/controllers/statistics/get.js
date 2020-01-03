module.exports = {
  friendlyName: "GET statitis company",
  description: "GET statitis product, product type, user chat, menu, icon",
  inputs: {
    from: { type: "number", allowNull: true },
    to: { type: "number", allowNull: true }
  },
  exits: {},
  fn: async function(inputs, exits) {
    var query = {
      createdAt: {
        $gte: inputs.from ? inputs.from : 0,
        $lte: inputs.to ? inputs.to : new Date().getTime()
      },
      isDelete: false,
      $or: [{ username: this.req.headers.username }, { owner: this.req.headers.username }]
    };

    // conversation
    let dbConversation = Conversation.getDatastore().manager;
    let collectionConversation = dbConversation.collection(
      Conversation.tableName
    );

    // menu
    let dbMenu = Menu.getDatastore().manager;
    let collectionMenu = dbMenu.collection(Menu.tableName);

    // IconHeader
    let dbIconHeader = IconHeader.getDatastore().manager;
    let collectionIconHeader = dbIconHeader.collection(IconHeader.tableName);

    // Product
    let dbProduct = Product.getDatastore().manager;
    let collectionProduct = dbProduct.collection(Product.tableName);

    // ProductType
    let dbProductType = ProductType.getDatastore().manager;
    let collectionProductType = dbProductType.collection(ProductType.tableName);

    let [
      totalConversation,
      totalMenu,
      totalIconHeader,
      totalProduct,
      totalProductType
    ] = await Promise.all([
      collectionConversation.find(query).count(),
      collectionMenu.find(query).count(),
      collectionIconHeader.find(query).count(),
      collectionProduct.find(query).count(),
      collectionProductType.find(query).count()
    ]);
    return exits.success({
      conversation: totalConversation,
      menu: totalMenu,
      iconHeader: totalIconHeader,
      product: totalProduct,
      productType: totalProductType
    });
  }
};

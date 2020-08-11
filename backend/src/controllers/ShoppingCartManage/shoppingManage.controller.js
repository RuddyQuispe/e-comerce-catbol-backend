const shoppingManageModel = require('../../models/ShoppingCartManage/shoppingManage.model');

const getShoppingManage = async  (req, res) => {
    const clothingList = await shoppingManageModel.getListClothesShopping();
    res.json({
        clothing_list : clothingList
    });
}

module.exports = {
    getShoppingManage
}
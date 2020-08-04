const inventoryModel = require('../../models/InventoryShoppingManage/inventoryManage.model');

const getInventoryManage = async (req, res) => {
    const listInventory = await inventoryModel.getInventoryData();
    res.json({
        list_inventory : listInventory
    });   
}

module.exports = {
    getInventoryManage
}
const { route } = require('./providerManage.route');

const router = require('express').Router();
const {getInventoryManage} = require('../../controllers/InventoryShoppingManage/inventoryManage.controller');

router.get('/inventory_shopping_manage/inventory_manage', getInventoryManage);

module.exports = router;
const router = require('express').Router();
const {getProviderManage, postProviderManage} = require('../../controllers/InventoryShoppingManage/providerManage.controller');

router.get('/inventory_shopping_manage/provider_manage', getProviderManage);

router.post('/inventory_shopping_manage/provider_manage', postProviderManage);

module.exports = router;
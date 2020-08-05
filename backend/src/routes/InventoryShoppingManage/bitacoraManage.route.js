const router = require('express').Router();
const {getBitacoraManage} = require('../../controllers/InventoryShoppingManage/bitacoraManage.controller');

router.get('/inventory_shopping_manage/bitacora_manage', getBitacoraManage);

module.exports = router;
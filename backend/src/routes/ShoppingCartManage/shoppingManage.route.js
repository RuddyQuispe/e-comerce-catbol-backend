const router = require('express').Router();
const {getShoppingManage} = require('../../controllers/ShoppingCartManage/shoppingManage.controller');

router.get('/shopping_cart_manage/shopping_manage', getShoppingManage);

module.exports = router;
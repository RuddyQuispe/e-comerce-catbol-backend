const router = require('express').Router();
const {getShoppingManage, getShoppingCategory, getListCouponUser, postGetCouponUser, postGenerateShoppingCart, getListShoppingList, removeShoppingList} = require('../../controllers/ShoppingCartManage/shoppingManage.controller');

router.get('/shopping_cart_manage/shopping_manage', getShoppingManage);

router.get('/shopping_cart_manage/shopping_manage/:id_category', getShoppingCategory);

router.get('/shopping_cart_manage/coupon_user/:id_user', getListCouponUser);

router.post('/shopping_cart_manage/coupon_user_register', postGetCouponUser);

router.post('/shopping_cart_manage/shopping_generate', postGenerateShoppingCart);

router.get('/shopping_cart_manage/shopping_list/:code_shopping', getListShoppingList);

router.post('/shopping_cart_manage/shopping_list/remove', removeShoppingList);

module.exports = router;
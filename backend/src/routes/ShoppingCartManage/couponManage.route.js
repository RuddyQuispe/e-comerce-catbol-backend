const router = require('express').Router();
const {getCouponManage, postCouponManage} = require('../../controllers/ShoppingCartManage/couponManage.controller');

router.get('/shopping_cart_manage/coupon_manage', getCouponManage);

router.post('/shopping_cart_manage/coupon_manage', postCouponManage);

module.exports = router
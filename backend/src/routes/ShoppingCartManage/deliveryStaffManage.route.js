const { route } = require('./clientUserManage.route');

const router = require('express').Router();
const {getListDelivery, postDeliveryManage} = require('../../controllers/ShoppingCartManage/deliveryStaffManage.controller');

router.get('/shopping_cart_manage/delivery_staff_manage', getListDelivery);

router.post('/shopping_cart_manage/delivery_staff_manage', postDeliveryManage);

module.exports = router;
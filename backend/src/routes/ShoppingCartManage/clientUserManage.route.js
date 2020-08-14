const router = require('express').Router();
const {getClientUserManage, postClientUser, putEnableDisableClientUser} = require('../../controllers/ShoppingCartManage/clientUseerManage.controller');

router.get('/shopping_cart_manage/client_user_manage', getClientUserManage);

router.post('/shopping_cart_manage/client_user_manage', postClientUser);

router.put('/shopping_cart_manage/client_user_manage/enable_disable/:id_user', putEnableDisableClientUser);

module.exports = router
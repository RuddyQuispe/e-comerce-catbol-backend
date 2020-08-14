const router = require('express').Router();
const {getClientUserManage, postClientUser, putEnableDisableClientUser, getReportClientFrequent, getReportPayment, getReportShoppingSale} = require('../../controllers/ShoppingCartManage/clientUseerManage.controller');

router.get('/shopping_cart_manage/client_user_manage', getClientUserManage);

router.post('/shopping_cart_manage/client_user_manage', postClientUser);

router.put('/shopping_cart_manage/client_user_manage/enable_disable/:id_user', putEnableDisableClientUser);

router.get('/shopping_cart_manage/report_clients_frequent', getReportClientFrequent);

router.get('/shopping_cart_manage/report_payment', getReportPayment);

router.get('/shopping_cart_manage/report_shopping_sale', getReportShoppingSale);

module.exports = router
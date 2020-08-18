const router = require('express').Router();
const path = require('path');
const {postRegisterInvoice, getInvoiceManage, getInvoiceOnly} = require('../../controllers/ShoppingCartManage/invoiceManage.controller');

router.post('/shopping_cart_manage/invoice_manage_generate', postRegisterInvoice);

router.get('/shopping_cart_manage/invoice_manage', getInvoiceManage);

router.post('/shopping_cart_manage/invoice_manage_generate/print', getInvoiceOnly);

//Get Image File to client http://localhost:4000/img/*
router.get("/pdf/:name",function(req, res){ 
    res.download(path.join(__dirname, `../../../../security/${req.params.name}.pdf`));
});

module.exports = router;
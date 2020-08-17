const router = require('express').Router();
const {getSaleNoteData, getSaleNoteManageList, postSaleNoteManageConclusion, getSaleNoteAdmin, postAssignDeliveryOwner, putConclusionSaleNote} = require('../../controllers/ShoppingCartManage/saleNoteManage.controller');

router.get('/shopping_cart_manage/sale_note_manage_list', getSaleNoteManageList);

router.get('/shopping_cart_manage/sale_note_manage/:cod_shopping', getSaleNoteData);

router.post('/shopping_cart_manage/sale_note_manage_conclusion', postSaleNoteManageConclusion);

router.get('/shopping_cart_manage/sale_note_admin', getSaleNoteAdmin);

router.post('/shopping_cart_manage/sale_note_assign_delivery', postAssignDeliveryOwner);

router.put('/shopping_cart_manage/sale_note_conclusion/:code_sale', putConclusionSaleNote);

module.exports = router;
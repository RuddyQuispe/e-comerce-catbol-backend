const router = require('express').Router();
const {getEntryNote, postEntryNote, postEntryNoteDetail, getEntryNoteDetail, deleteEntryDetail} = require('../../controllers/InventoryShoppingManage/entryNoteManage.controller');

router.get('/inventory_shopping_manage/entry_note_manage', getEntryNote);

router.post('/inventory_shopping_manage/entry_note_manage', postEntryNote);

router.post('/inventory_shopping_manage/entry_note_manage/detail/:entry_no', postEntryNoteDetail);

router.get('/inventory_shopping_manage/entry_note_manage/detail/:entry_no', getEntryNoteDetail);

router.delete('/inventory_shopping_manage/entry_note_manage/detail/delete/:entry_no/:id_detail', deleteEntryDetail);

module.exports = router;
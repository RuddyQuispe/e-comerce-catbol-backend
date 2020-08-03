const router = require('express').Router();
const {getEntryNote, postEntryNote} = require('../../controllers/InventoryShoppingManage/entryNoteManage.controller');

router.get('/inventory_shopping_manage/entry_note_manage', getEntryNote);

router.post('/inventory_shopping_manage/entry_note_manage', postEntryNote);

module.exports = router;
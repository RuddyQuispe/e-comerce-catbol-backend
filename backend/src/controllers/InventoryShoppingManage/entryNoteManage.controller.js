const entryNoteModel = require('../../models/InventoryShoppingManage/entryNoteManage.model');
const providerModel = require('../../models/InventoryShoppingManage/providerManage.model');
const sizeManageModel = require('../../models/ClothingManage/sizeManage.model');
const clothingModel = require('../../models/ClothingManage/clothingManage.model');

const getEntryNote = async (req, res) => {
    const entryNoteList = await entryNoteModel.getListEntryNotes();
    const getOptionsProvider = await providerModel.getLisProvider();
    res.json({
        entryNoteList,
        getOptionsProvider
    });
}

const postEntryNote = async (req, res) => {
    const {description, date_note, id_user, id_provider} = req.body;
    console.log(req.body);
    const entry_no = await entryNoteModel.registerEntryNote(description, date_note, id_user, id_provider);
    if (entry_no>0) {
        res.json({
            message : `Entry note registered successfully (No. ${entry_no})`
        });
    }else{
        res.json({
            message : `Entry Note don't registered`
        });
    }
}

const getEntryNoteDetail = async (req, res) => {
    const listEntryDetail = await entryNoteModel.getListDetail(req.params.entry_no);
    const optionsClothing = await clothingModel.getListOptionsClothing();
    const optionsSize = await sizeManageModel.getListOptionsSize();
    res.json({
        list_entry_detail : listEntryDetail,
        options_clothing: optionsClothing,
        options_size : optionsSize
    });
}

const postEntryNoteDetail = async (req, res) => {
    const {id_tail, code_clothing, quantity} = req.body;
    console.log(req.body);
    const idDetail =  await entryNoteModel.registerEntryNoteDetail(req.params.entry_no, id_tail, code_clothing, quantity);
    if (idDetail > 0) {
        res.json({
            message : `This entry note detail (id: ${idDetail}) was registered successfully`
        });
    }else{
        res.json({
            message : `Error in register entry note detail`
        });
    }
}

const deleteEntryDetail = async (req, res) => {
    if (await entryNoteModel.deleteDetailEntryNote(req.params.entry_no, req.params.id_detail)) {
        res.json({
            message : `Detail ID: ${req.body.id_detail} Entry No. ${req.params.entry_no} was deleted successfully`
        });
    } else {
        res.json({
            message : `I have a problems to delete detail id: ${req.body.id_detail}`
        });
    }
}

module.exports= {
    getEntryNote,
    postEntryNote,
    getEntryNoteDetail,
    postEntryNoteDetail,
    deleteEntryDetail
}
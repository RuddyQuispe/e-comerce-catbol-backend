const entryNoteModel = require('../../models/InventoryShoppingManage/entryNoteManage.model');
const providerModel = require('../../models/InventoryShoppingManage/providerManage.model');

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




module.exports= {
    getEntryNote,
    postEntryNote
}
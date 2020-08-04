const pool = require('../../database');

module.exports = {
    async getListEntryNotes(){
        try {
            const response = await pool.query(`select en.no_entry, en.date_note, en.description, en.date_note, u.username, p."name" from entry_note en, "user" u, provider p where en.id_provider=p.ci_nit and u.id=en.id_user`);
            return response.rows;
        } catch (error) {
            console.log("Error in get list provider",error);
            return null;
        }
    },
    
    async registerEntryNote(description, dateNote, idUser, idProvider){
        try {
            const response = await pool.query(`select register_note('${description}', cast('${dateNote}' as date), ${idUser}, ${idProvider})`);
            return response.rows[0].register_note;
        } catch (error) {
            console.log("Error entry note", error);
            return -1;
        }
    },

    async registerEntryNoteDetail(no_entry, id_tail, code_clothing, quantity){
        try {
            const response = await pool.query(`select register_detail_note(${no_entry}, cast(${id_tail} as smallint), ${code_clothing}, cast(${quantity} as smallint))`);
            return response.rows[0].register_detail_note;
        } catch (error) {
            console.log("Error in register Entry Note Detail",error);
            return -1;
        }
    },

    async getListDetail(entryNo){
        try {
            const response = await pool.query(`select ed.id_detail, s.description as description_size, c.description, c.color, ed.quantity from entry_detail ed, "size" s, clothing c where ed.id_tail=s.id and c.code_clothing=ed.code_clothing and ed.no_entry=${entryNo}`);
            return response.rows;
        } catch (error) {
            console.log("Erro in get List Entry Detail", error);
            return null;
        }
    },

    async deleteDetailEntryNote(entryNoteNo, idDetail){
        try {
            await pool.query(`delete from entry_detail where no_entry=${entryNoteNo} and id_detail=${idDetail}`);
            return true;
        } catch (error) {
            console.log("Error in delete entry note: ", error);
            return false;
        }
    }
}
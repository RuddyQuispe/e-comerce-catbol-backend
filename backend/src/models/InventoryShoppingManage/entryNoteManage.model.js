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
    }
}
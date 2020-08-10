const pool = require('../../database');

module.exports = {
    async getListCategory() {
        try {
            const response = await pool.query('select id_category, name, description, "type", status from category');
            return response.rows;
        } catch (error) {
            console.log("Error in get list category model", error);
            return null;
        }
    },

    async registerCategory(name, description, typeCategory){
        try {
            const response = await pool.query(`select register_category('${name}', '${description}', ${typeCategory}, true)`);
            return response.rows[0].register_category;
        } catch (error) {
            console.log("error in register category", error);
            return -1;
        }
    },

    async enableDisableCategory(idCategory){
        try {
            await pool.query(`update category set status=not status where id_category=${idCategory}`);
            return true
        } catch (error) {
            console.log("Error in enabe disable category"+idCategory, error);
            return false;
        }
    }
}
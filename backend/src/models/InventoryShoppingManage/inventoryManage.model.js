const pool = require('../../database');

module.exports = {
    async getInventoryData() {
        try {
            const response = await pool.query(`select c.code_clothing, c.description, c.color, s.description as description_size, sc.stock from size_clothes sc, "size" s, clothing c where sc.code_clothing=c.code_clothing and sc.id_size=s.id and c.code_clothing not in (select distinct code_clothing_super from clothing_group) order by c.code_clothing`);
            return response.rows;
        } catch (error) {
            console.log("Error in inventory manage", error);
            return null;
        }
    }
}
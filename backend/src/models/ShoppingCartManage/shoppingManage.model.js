const pool = require('../../database');

module.exports = {
    async getListClothesShopping(){
        const response = await pool.query(`select c.code_clothing, c.description, c.image_name, c.characterists, c.color, s.id, s.description as description_size, sc.price, sc.discount from clothing c, "size" s, size_clothes sc where c.estatus and c.code_clothing=sc.code_clothing and sc.id_size=s.id`);
        return response.rows;
    }
}
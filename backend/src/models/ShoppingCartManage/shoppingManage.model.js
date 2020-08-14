const pool = require('../../database');

module.exports = {
    async getListClothesShopping(){
        const response = await pool.query(`select c.code_clothing, c.description, c.image_name, c.characterists, c.color, s.id, s.description as description_size, sc.price, sc.discount from clothing c, "size" s, size_clothes sc where c.estatus and c.code_clothing=sc.code_clothing and sc.id_size=s.id`);
        return response.rows;
    },

    async getReportDateSale(){
        try {
            const response = await pool.query(`select date_shopping, count(distinct id_shopping_cart) from shopping_cart group by date_shopping order by date_shopping desc limit 8`);
            return response.rows;
        } catch (error) {
            console.log("Error in get report sale", error);
            return null;
        }
    }
}
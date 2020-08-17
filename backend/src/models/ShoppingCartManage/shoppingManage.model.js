const pool = require('../../database');
const { getListShoppingList } = require('../../controllers/ShoppingCartManage/shoppingManage.controller');

module.exports = {
    async getListClothesShopping(){
        const response = await pool.query(`select c.code_clothing, c.description, c.image_name, c.characterists, c.color, s.id, s.description as description_size, sc.price, sc.discount from clothing c, "size" s, size_clothes sc where c.estatus and c.code_clothing=sc.code_clothing and sc.id_size=s.id and sc.stock>0`);
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
    },

    async getClothesCategory(idCategory){
        try {
            const response = await pool.query(`select c.code_clothing, c.description, c.image_name, c.characterists, c.color, s2.id, s2.description as description_size, sc.price, sc.discount from clothes_category cc, clothing c, size_clothes sc, "size" s2 where cc.code_clothing=c.code_clothing and sc.code_clothing=c.code_clothing and sc.id_size=s2.id and c.estatus and cc.id_category=${idCategory} and sc.stock>0`);
            return response.rows;
        } catch (error) {
            console.log("Error in get clothes category", error);
            return null;
        }
    },

    async registerNewShoppingCart(CIUser){
        try {
            const response = await pool.query(`select create_shopping_cart(${CIUser});`);
            return response.rows[0].create_shopping_cart;
        } catch (error) {
            console.log("Error in register shopping cart", error);
            return -1;
        }
    },

    async registerShoppingList(codeClothing, idSize, idShoppingCart){
        try {
            const response = await pool.query(`select add_clothing_to_shopping_cart(${codeClothing}, cast(${idSize} as smallint), ${idShoppingCart})`);
            return response.rows[0].add_clothing_to_shopping_cart;
        } catch (error) {
            console.log("Error in register shopping list", error);
            return false;
        }
    },

    async getListShoppingList(codeShopping){
        try {
            const response = await pool.query(`select c.code_clothing, c.description, c.image_name, sc.price, sc.discount, sl.quantity, sl.subtotal, s.id, s.description as size_clothes from shopping_list sl, size_clothes sc, "size" s, clothing c where sl.code_clothing=sc.code_clothing and sc.code_clothing=c.code_clothing and sl.id_size=sc.id_size and sc.id_size=s.id and sl.id_shopping_cart=${codeShopping}`);
            return response.rows;
        } catch (error) {
            console.log("Error in get shopping list", error);
            return false;
        }
    },

    async removeShopping(codeShopping, codeClothing, idSize){
        try {
            await pool.query(`delete from shopping_list where code_clothing=${codeClothing} and id_size=${idSize} and id_shopping_cart=${codeShopping}`);
            return true;
        } catch (error) {
            console.log("Error in remove shopping list", error);
            return false;
        }
    },

    async getOwnerShoppingCart(codeShoppingCart){
        try {
            const response = await pool.query(`select ci from shopping_cart where id_shopping_cart=${codeShoppingCart}`);
            return response.rows[0].ci;
        } catch (error) {
            console.log("Error in gestCIShopping", error);
            return -1;
        }
    },

    async subTotalShoppingList(codeShopping){
        try {
            const response = await pool.query(`select sum(subtotal) from shopping_list where id_shopping_cart=${codeShopping}`);
            return response.rows[0].sum;
        } catch (error) {
            console.log("Error in subTotal Shopping", error);
            return 0;
        }
    }
}
const pool = require('../../database');

module.exports = {
    async getListSaleNoteManage(){
        try {
            const response = await pool.query(`select sn.code_sale, sn.address_send, sn.no_home, sn.province, sn.city, sn.status_sale, sn.payment_type, sn.id_shopping_cart, u2.username, ds."name", ds.movil_description from sale_note sn, "user" u2, delivery_staff ds where sn.id_user=u2.id and sn.code_delivery=ds.code_delivery`);
            return response.rows;
        } catch (error) {
            console.log("Error get sale note", error);
            return null;
        }
    },

    async registerSaleNote(addressSend, noHome, province, city, paymentType, idShoppingCart, corporate, nit, person_receive){
        try {
            console.log(addressSend, noHome, province, city, paymentType, idShoppingCart, corporate, nit, person_receive);
            console.log(`select register_sale_note('${addressSend}', cast(${noHome} as smallint), '${province}', '${city}', ${paymentType}, ${idShoppingCart}, '${corporate}', '${nit}', '${person_receive}')`);
            const response = await pool.query(`select register_sale_note('${addressSend}', cast(${noHome} as smallint), '${province}', '${city}', ${paymentType}, ${idShoppingCart}, '${corporate}', '${nit}', '${person_receive}')`);
            return response.rows[0].register_sale_note;
        } catch (error) {
            console.log("Error in register sale note", error);
            return -1;
        }
    },

    async getListSaleNoteAdmin(){
        try {
            const response = await pool.query(`select code_sale, address_send, no_home, province, city, status_sale, payment_type, id_user, get_user_assigned(id_user), id_shopping_cart, code_delivery, get_delivery_assigned(code_delivery), corporate, nit from sale_note`);
            return response.rows;
        } catch (error) {
            console.log("Error in sale note admin", error);
            return null;
        }
    },

    async assignDeliveryOwner(codeSale, idUser, idDelivery){
        try {
            await pool.query(`update sale_note set id_user=${idUser},code_delivery=${idDelivery} where code_sale=${codeSale}`);
            return true;
        } catch (error) {
            console.log("Error in assign delivery", error);
            return false;
        }
    },

    async conclusionSaleNote(codeSale){
        try {
            await pool.query(`update sale_note set status_sale=true where code_sale=${codeSale}`);
            return true;
        } catch (error) {
            console.log("Error in conclusion sale note", error);
            return false;
        }
    },

    async getOwnerSaleNote(codeSale){
        try {
            const response = await pool.query(`select sc2.ci from sale_note sn, shopping_cart sc2 where sc2.id_shopping_cart=sn.id_shopping_cart and sn.code_sale=${codeSale}`);
            return response.rows[0].ci;
        } catch (error) {
            console.log("Error in get owner sale note", error);
            return -1;
        }
    },

    async getTotalCost(codeSale){
        try {
            const response = await pool.query(`select sum(sl.subtotal) from sale_note sn, shopping_cart sc, shopping_list sl where sn.id_shopping_cart=sc.id_shopping_cart and sc.id_shopping_cart=sl.id_shopping_cart and sn.code_sale=${codeSale}`);
            return response.rows[0].sum;
        } catch (error) {
            console.log("Error in get Total Cost Sale note", error);
            return 0;
        }
    },

    async getCitySaleNoteToSend(codeSale){
        try {
            const response = await pool.query(`select city from sale_note where code_sale=${codeSale}`);
            return response.rows[0].city;
        } catch (error) {
            console.log("Error in get Total Cost Sale note", error);
            return 0;
        }
    }
}
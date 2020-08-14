const pool = require('../../database');

module.exports = {
    async getListDelivery(){
        try {
            const response = await pool.query(`select code_delivery, "name", movil_description from delivery_staff`);
            return response.rows;
        } catch (error) {
            console.log("Error in get List delivery", error);
            return null;
        }
    },

    async registerDeliveryStaff(name, mobileDescription){
        try {
            const response = await pool.query(`select register_delivery('${name}', '${mobileDescription}')`);
            return response.rows[0].register_delivery;
        } catch (error) {
            console.log("Error in delivery staff register", error);
            return -1;
        }
    }
}
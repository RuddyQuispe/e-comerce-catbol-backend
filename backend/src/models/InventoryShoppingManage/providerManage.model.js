const pool = require('../../database');

module.exports = {
    async getLisProvider(){
        try {
            const response = await pool.query(`select ci_nit, "name", phone, address, email from provider`);
            return response.rows;
        } catch (error) {
            console.log("Error in provider model", error);
            return null;
        }
    },

    async registerProvider(ciNit, name, phone, address, email){
        try {
            const response = await pool.query(`select register_provider(${ciNit}, '${name}', '${phone}', '${address}', '${email}')`);
            return response.rows[0].register_provider;
        } catch (error) {
            console.log("Error in register role", error);
            return false;
        }
    }
}
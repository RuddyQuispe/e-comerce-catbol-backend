const pool = require('../../database');

module.exports = {
    async getDataClientUser(ci){
        try {
            const response = await pool.query(`select * from client_user where ci=${ci}`);
            return response.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getCIClientUser(email){
        try {
            const response = await pool.query(`select ci from client_user where email='${email}'`);
            console.log(response.rows[0]);
            return response.rows[0].ci;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
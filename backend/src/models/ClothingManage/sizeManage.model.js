const pool = require('../../database');

module.exports = {
    async getListOptionsSize(){
        try {
            const response = await pool.query(`select * from "size"`);
            return response.rows;
        } catch (error) {
            console.log("Error in get size options model", error);
            return null;
        }
    }
}
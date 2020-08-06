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
    },

    async registerSize(description){
        try {
            const response = await pool.query(`select register_size('${description}')`);
            return response.rows[0].register_size;
        } catch (error) {
            console.log("Erro in register size", error);
            return -1;
        }
    }
}
const pool = require('../../database');

module.exports = {
    async getListCoupon(){
        try {
            const response = await pool.query(`select coupon_code, limit_date, discount from coupon`);
            return response.rows;
        } catch (error) {
            console.log("Error in get List Coupon", error);
            return null;
        }
    },

    async registerNewCoupon(limitDate, discount){
        try {
            const response = await pool.query(`select register_new_cupon('${limitDate}', cast(${discount} as decimal(12,2)));`);
            return response.rows[0].register_new_cupon;
        } catch (error) {
            console.log("Error in register Coupon", error);
            return -1;
        }
    }
}
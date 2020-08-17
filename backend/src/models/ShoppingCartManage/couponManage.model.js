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
    },

    async getCouponHaveAndNotHave(ciUserClient){
        try {
            const responseCouponHas = await pool.query(`select * from coupon where coupon_code in (select coupon_code from coupon_list where ci_client_user=${ciUserClient})`);
            const responseCouponNotHas = await pool.query(`select * from coupon where coupon_code not in (select coupon_code from coupon_list where ci_client_user=${ciUserClient})`);
            return {
                list_coupon_user : responseCouponHas.rows,
                list_coupon_not_user : responseCouponNotHas.rows
            };
        } catch (error) {
            console.log("Error in get last coupon", error);
            return null;
        }
    },

    async registerCouponUserClient(CIUser, codeCoupon){
        try {
            const response = await pool.query(`select get_coupon(${CIUser}, cast(${codeCoupon} as smallint))`);
            return response.rows[0].get_coupon;
        } catch (error) {
            console.log("Error in register coupon model");
            return false;
        }
    },

    async getLastCoupon(ciUserClient){
        try {
            const response = await pool.query(`select get_discount_last_coupon(${ciUserClient})`);
            return response.rows[0].get_discount_last_coupon;
        } catch (error) {
            console.log("Error in get Last Coupon to use", error);
            return null;
        }
    }
}
const couponModel = require('../../models/ShoppingCartManage/couponManage.model');

const getCouponManage = async (req, res) => {
    const listCoupon = await couponModel.getListCoupon();
    res.json(listCoupon);
}

const postCouponManage = async (req, res) => {
    const {limit_date, discount} = req.body;
    const idCoupon = await couponModel.registerNewCoupon(limit_date, discount);
    if (idCoupon>0) {
        res.json({
            message : `Se registro correctamente el cupon ID: ${idCoupon}`
        });
    }else{
        res.json({
            message : `Error al registrar el nuevo cupon`
        });
    }
}

module.exports = {
    getCouponManage,
    postCouponManage
}
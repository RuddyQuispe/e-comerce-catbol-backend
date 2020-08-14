const deliveryStaffModel = require('../../models/ShoppingCartManage/deliveryStaffManage.model');
const getListDelivery = async (req, res) => {
    const deliveryList = await deliveryStaffModel.getListDelivery();
    res.json(deliveryList);
}

const postDeliveryManage = async (req, res) => {
    const {name, movil_description} = req.body;
    const idDelivery = await deliveryStaffModel.registerDeliveryStaff(name, movil_description);
    if (idDelivery>0) {
        res.json({
            message : `El personal de entrega se registro correctamente ID:${idDelivery}`
        });
    }else{
        res.json({
            message : `El personal de delivery ya existe, restaure sus datos`
        });
    }
}

module.exports = {
    getListDelivery,
    postDeliveryManage
}
const clientUserModel = require('../../models/ShoppingCartManage/clientUserManage.model');
const shoppingManageModel = require('../../models/ShoppingCartManage/shoppingManage.model');

const getClientUserManage = async (req, res) => {
    const listClientUser = await clientUserModel.getListUser();
    res.json(listClientUser);
}

const postClientUser = async (req, res) => {
    const {ci, first_name, last_name, email, phone, address, province, city, password} = req.body;
    if (await clientUserModel.registerClientUser(ci, first_name, last_name, email, phone, address, province, city, password)) {
        res.json({
            message : `EL cliente ${first_name} ${last_name} fue registrado correctamente`
        });
    }else{
        res.json({
            message : `Hubo problemas al registrar, ya esta registrado el CI o el email, restaure su contraseña porfavor`
        });
    }
}

const putEnableDisableClientUser = async (req, res) => {
    if (await clientUserModel.enableDisableClientUser(req.params.id_user)) {
        res.json({
            message : `EL cliente ${req.params.id_user} cambió su estado`
        });
    }else{
        res.json({
            message : `EL cliente ${req.params.id_user} tuvo problemas al cambiar su estado`
        });
    }
} 

const getReportClientFrequent = async (req, res) => {
    const reportClientFrequent = await clientUserModel.getReportClientFrequent();
    res.json(reportClientFrequent);
}

const getReportPayment = async (req, res) => {
    const reportPayment = await clientUserModel.getReportPayment();
    res.json(reportPayment);
}

const getReportShoppingSale = async (req, res) => {
    const listReport = await shoppingManageModel.getReportDateSale();
    res.json(listReport);
}

module.exports = {
    getClientUserManage,
    postClientUser,
    putEnableDisableClientUser,
    getReportClientFrequent,
    getReportPayment,
    getReportShoppingSale
}
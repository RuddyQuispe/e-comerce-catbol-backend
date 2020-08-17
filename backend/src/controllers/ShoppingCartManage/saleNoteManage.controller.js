const saleNoteModel = require('../../models/ShoppingCartManage/saleNoteManage.model');
const userClientModel = require('../../models/ShoppingCartManage/clientUserManage.model');
const shoppingCartModel = require('../../models/ShoppingCartManage/shoppingManage.model');
const couponModel = require('../../models/ShoppingCartManage/couponManage.model');
const deliveryStaffModel = require('../../models/ShoppingCartManage/deliveryStaffManage.model');

const getSaleNoteData = async (req, res) => {
    const {cod_shopping} = req.params;
    const ciUser = await shoppingCartModel.getOwnerShoppingCart(cod_shopping);
    const subTotal = await shoppingCartModel.subTotalShoppingList(cod_shopping);
    if (ciUser>0) {
        const clientData = await userClientModel.getDataClientUser(ciUser);
        const discount = await couponModel.getLastCoupon(ciUser);
        res.json({clientData, subTotal, discount});
    }else{
        res.json({
            message : "No exists"
        });
    }
}

const getSaleNoteManageList = async (req, res) => {
    const listSaleNote = await saleNoteModel.getListSaleNoteManage();
    res.json(listSaleNote);
}

const postSaleNoteManageConclusion = async (req, res) => {
    const {address_send, home_no, province, city, id_shopping_cart, corporate, nit} = req.body;
    console.log(req.body);
    const idSaleNote = await saleNoteModel.registerSaleNote(address_send, home_no, province, city, false, id_shopping_cart, corporate, nit);
    if (idSaleNote>0) {
        res.json({
            message : `La nota Nro. ${idSaleNote} se registro correctamente a su nombre. porfavor espere su factura en la entrega delivery`
        });
    }else{
        res.json({
            message : "no se pudo registrar la nota de venta, por favor intente de nuevo"
        });
    }
    //province, city, status_sale, payment_type, id_user, id_shopping_cart, code_delivery, corporate, nit
}

const getSaleNoteAdmin = async (req, res) => {
    const listSaleNoteAdmin = await saleNoteModel.getListSaleNoteAdmin();
    const deliveryList = await deliveryStaffModel.getListDelivery();
    res.json({
        list_sale_note_admin : listSaleNoteAdmin,
        list_delivery : deliveryList
    });
}

const postAssignDeliveryOwner = async (req, res) => {
    const {code_sale, id_delivery, id_user_owner} = req.body;
    console.log(req.body);
    if (await saleNoteModel.assignDeliveryOwner(code_sale, id_user_owner, id_delivery)) {
        res.json({
            message : "Se asignó correctamente el personal delivery"
        });
    } else {
        res.json({
            message : "Hubo Problemas a asignar responsables a la nota de venta"
        });
    }
}

const putConclusionSaleNote = async (req, res) => {
    const {code_sale} = req.params;
    console.log(code_sale);
    if (await saleNoteModel.conclusionSaleNote(code_sale)) {
        res.json({
            message : "Se concluyó la venta #"+code_sale
        });
    } else {
        res.json({
            message : "No se pudo concluir la venta #"+code_sale
        });
    }
}

module.exports = {
    getSaleNoteData,
    getSaleNoteManageList,
    postSaleNoteManageConclusion,
    getSaleNoteAdmin,
    postAssignDeliveryOwner,
    putConclusionSaleNote
}
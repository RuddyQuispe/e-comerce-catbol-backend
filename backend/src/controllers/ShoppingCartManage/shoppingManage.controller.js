const shoppingManageModel = require('../../models/ShoppingCartManage/shoppingManage.model');
const couponModel = require('../../models/ShoppingCartManage/couponManage.model');

const getShoppingManage = async  (req, res) => {
    const clothingList = await shoppingManageModel.getListClothesShopping();
    res.json({
        clothing_list : clothingList
    });
}

const getShoppingCategory = async (req, res) => {
    const listShoppingClothes = await shoppingManageModel.getClothesCategory(req.params.id_category);
    res.json(listShoppingClothes);
}

const getListCouponUser = async (req, res) => {
    const listCouponAvailable = await couponModel.getCouponHaveAndNotHave(req.params.id_user);
    res.json(listCouponAvailable);
}

const postGetCouponUser = async (req, res) => {
    const {code_coupon, ci_user} = req.body;
    if (await couponModel.registerCouponUserClient(ci_user, code_coupon)) {
        res.json({
            message : "Felicidades, obtuviste el cupon, Aprovechalo"
        });
    } else {
        res.json({
            message : "Lastimosamente no puedes obtener el cupon, este ya venció o hubo problemas al registrar"
        });
    }
}

const postGenerateShoppingCart = async (req, res) => {
    const {ci_client, list_clothing} = req.body;
    console.log(req.body);
    const codeShoppingCart = await shoppingManageModel.registerNewShoppingCart(ci_client);
    if (codeShoppingCart>0) {
        arrayErrors = Array();
        for (let index = 0; index < list_clothing.length; index++) {
            if (await shoppingManageModel.registerShoppingList(list_clothing[index].code_clothing, list_clothing[index].id_size, codeShoppingCart)) {
                console.log("registered", list_clothing[index].code_clothing, list_clothing[index].id_size, codeShoppingCart);
            }else{
                arrayErrors.push(list_clothing[index].code_clothing);
            }
        }
        if (arrayErrors.length>0) {
            res.json({
                message : `Se registro el carrito; pero no los productos por falta de stock ${arrayErrors.toString()}`,
                result : true,
                cod_shopping_cart : codeShoppingCart
            });
        }else{
            res.json({
                message : `Se registro el carrito; correctamente #${codeShoppingCart}`,
                result : true,
                cod_shopping_cart : codeShoppingCart
            });
        }
    } else {
        res.json({
            message : "Tuvimos problemas de registrar tu carrito de compras",
            result : false
        });
    }
}

const getListShoppingList = async (req, res) => {
    const {code_shopping} = req.params;
    const shoppingList = await shoppingManageModel.getListShoppingList(code_shopping);
    res.json(shoppingList);
}

const removeShoppingList = async (req, res) => {
    const {code_shopping, code_clothing, id_size} = req.body;
    if (await shoppingManageModel.removeShopping(code_shopping, code_clothing, id_size)) {
        res.json({
            message: `eliminado correctamente la ropa con codigo: ${code_clothing}`
        });
    } else {
        res.json({
            message: `No se pudo eliminar la ropa`
        });
    }
}

module.exports = {
    getShoppingManage,
    getShoppingCategory,
    getListCouponUser,
    postGetCouponUser,
    postGenerateShoppingCart,
    getListShoppingList,
    removeShoppingList
}
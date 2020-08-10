const categoryModel = require('../../models/ClothingManage/categoryManage.model');

const getCategoryManage = async (req, res) => {
    const categoryList = await categoryModel.getListCategory();
    res.json(categoryList);
}

const postCategory = async (req, res) => {
    const {name, description, type} = req.body;
    const idNewCategory = await categoryModel.registerCategory(name, description, type);
    console.log(req.body);
    if (idNewCategory > 0) {
         res.json({
             message : `La categoria ${name} fue registrada correctamente`
         });
    } else {
        res.json({
            message : `La cetgoria ${name} no se registró`
        });
    }
}

const postEnableDisable = async  (req, res) => {
    const {id_category} = req.body;
    if (await categoryModel.enableDisableCategory(id_category)) {
        res.json({
            message : `Categoría #${id_category} cambio su estado correctamente`
        });
    } else {
        res.json({
            message : `Categoría #${id_category} tuvvo problemas de cambiar su estado`
        });
    }
}

module.exports = {
    getCategoryManage,
    postCategory,
    postEnableDisable
}
const categoryModel = require('../../models/ClothingManage/categoryManage.model');
const clothingModel = require('../../models/ClothingManage/clothingManage.model');

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
            message : `Categoría #${id_category} tuvo problemas de cambiar su estado`
        });
    }
}

const getListCategoryClothing = async (req, res) => {
    const {cod_category} = req.params;
    const categoryData = await categoryModel.getDataCategory(cod_category);
    const clothing_list = await clothingModel.getClothesToAssignCategory(cod_category);
    res.json({
        category_data : categoryData,
        clothing_list : clothing_list
    });
}

const postAddClothingCategory = async (req, res) => {
    const {code_clothing} = req.body;
    if (await categoryModel.registerCategoryClothes(code_clothing, req.params.cod_category)) {
        res.json({
            message : `Ropa ${code_clothing} Agregada a la Categoria ${req.params.cod_category} correctamente`
        });
    }else{
        res.json({
            message : `Ropa ${code_clothing} no Agregada a la Categoria ${req.params.cod_category}. Hubo Problemas`
        });
    }
}

const postRemoveClothingCategory = async (req, res) => {
    const {code_clothing} = req.body;
    if (await categoryModel.removeCategoryClothes(code_clothing, req.params.cod_category)) {
        res.json({
            message : `Ropa ${code_clothing} Eliminada de la Categoria ${req.params.cod_category} correctamente`
        });
    }else{
        res.json({
            message : `Ropa ${code_clothing} no eliminada de la Categoria ${req.params.cod_category}. Hubo Problemas`
        });
    }
}

module.exports = {
    getCategoryManage,
    postCategory,
    postEnableDisable,
    getListCategoryClothing,
    postAddClothingCategory,
    postRemoveClothingCategory
}
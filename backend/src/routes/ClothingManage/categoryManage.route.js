const router = require('express').Router();
const {getCategoryManage, postCategory, postEnableDisable, getListCategoryClothing, postAddClothingCategory, postRemoveClothingCategory} = require('../../controllers/ClothingManage/categoryManage.controller');

router.get('/clothing_manage/category_manage', getCategoryManage);

router.post('/clothing_manage/category_manage', postCategory);

router.post('/clothing_manage/category_manage/enable_disable', postEnableDisable);

router.get('/clothing_manage/category_manage/add_clothing_category/:cod_category', getListCategoryClothing);

router.post('/clothing_manage/category_manage/add_clothing_category/:cod_category', postAddClothingCategory);

router.post('/clothing_manage/category_manage/remove_clothing_category/:cod_category', postRemoveClothingCategory);

module.exports = router;
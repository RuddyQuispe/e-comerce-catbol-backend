const router = require('express').Router();
const path = require('path');
const {postClothing, getClothingManage, getPutClothing, putClothing, putEnableDisable, getClothingGroup, postClothingGroup} = require('../../controllers/ClothingManage/clothingManage.controller');

router.post('/clothing_manage/clothing_manage', postClothing);

router.get('/clothing_manage/clothing_manage', getClothingManage);

router.get('/clothing_manage/clothing_manage/:code_clothing/:id_size', getPutClothing);

router.put('/clothing_manage/clothing_manage/:code_clothing/:id_size', putClothing);

router.post('/clothing_manage/clothing_manage/enable_disable', putEnableDisable);

router.get('/clothing_manage/clothing_group_manage/:code', getClothingGroup);

router.post('/clothing_manage/clothing_group_manage/:code', postClothingGroup);

//Get Image File to client http://localhost:4000/img/*
router.get("/img/:id",function(req, res){ 
    res.sendFile(path.join(__dirname, '../../uploads/'+req.params.id));
});

module.exports = router;
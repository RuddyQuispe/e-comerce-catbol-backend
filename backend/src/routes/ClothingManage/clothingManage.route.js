const router = require('express').Router();
const path = require('path');
const {postClothing, getClothingManage} = require('../../controllers/ClothingManage/clothingManage.controller');

router.post('/clothing_manage/clothing_manage', postClothing);

router.get('/clothing_manage/clothing_manage', getClothingManage);

//Get Image File to client http://localhost:4000/img/*
router.get("/img/:id",function(req, res){ 
    res.sendFile(path.join(__dirname, '../../uploads/'+req.params.id));
});

module.exports = router;
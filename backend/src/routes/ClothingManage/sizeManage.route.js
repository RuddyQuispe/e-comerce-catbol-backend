const router = require('express').Router();

const {getSize, postSize} = require('../../controllers/ClothingManage/sizeManage.controller');

router.get('/clothing_manage/size_manage', getSize);

router.post('/clothing_manage/size_manage', postSize);

module.exports = router
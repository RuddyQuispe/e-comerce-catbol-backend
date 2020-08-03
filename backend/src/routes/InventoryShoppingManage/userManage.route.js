const router = require('express').Router();
const { postLogin, getUserManage, postUserManage, enableDisableUser, getUpdateUser, putUserData } = require('../../controllers/InventoryShoppingManage/userManage.controller');

router.post('/login', postLogin);

router.get('/inventory_shopping_manage/user_manage', getUserManage);

router.post('/inventory_shopping_manage/user_manage', postUserManage);

router.get('/inventory_shopping_manage/user_manage/update/:id', getUpdateUser);

router.put('/inventory_shopping_manage/user_manage/update/:id', putUserData);

router.put('/inventory_shopping_manage/user_manage/enable_disable/:id', enableDisableUser);

module.exports = router;
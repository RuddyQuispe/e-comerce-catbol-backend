const userModel = require('../../models/InventoryShoppingManage/userManage.model');
const clientUserModel = require('../../models/ShoppingCartManage/clientUserManage.model');

const postLogin = async (req, res) => {
    const response = await userModel.verifyUserPassword(req.body.email, req.body.password); // 0: Admin, 1:Client, -1:Any
    console.log("first data",response);
    if(response==0){
        let id = await userModel.getIdUser(req.body.email);
        console.log(id);
        const data = await userModel.getUserData(id);
        res.json({
            id: data.id,
            username: data.username,
            type: "Admin"
        });
    }else if (response==-1) {
        res.json({
            id: null,
            username: null,
            type: null
        });
    }else{
        let id = await clientUserModel.getCIClientUser(req.body.email);
        console.log(id);
        const data = await clientUserModel.getDataClientUser(id);
        res.json({
            id: data.ci,
            username: `${data.first_name} ${data.last_name}`,
            type: "Client"
        });
    }
}

const getUserManage = async (req, res) => {
    const userList = await userModel.getListUserAdmin();
    res.json({
        userList
    });
}

const postUserManage = async (req, res) => {
    console.log(req.body);
    const {username, email, role_description, password} = req.body;
    const idUser = await userModel.registerUserAdmin(username, role_description, email, password);
    if (idUser>0) {
        res.json({
            message : `user ${username} added successfully : id: ${idUser}`
        });
    } else {
        res.json({
            message : `the email: ${email} is already exists`
        });
    }
}

const enableDisableUser = async (req, res) => {
    if (await userModel.enableDisableUser(req.params.id)) {
        res.json({
            message : "change status successfully"
        });
    } else {
        res.json({
            message : "I have a problems to change status"
        });
    }
};

const getUpdateUser = async (req, res) => {
    const user_data = await userModel.getUserData(req.params.id);
    console.log(user_data);
    res.json(user_data);
}

const putUserData = async (req, res) => {
    const {username, email, rol_description} = req.body;
    if (await userModel.updateUser(req.params.id, email, username, rol_description)) {
        res.json({
            message : "user "+username+" updated successfully"
        });
    } else {
        res.json({
            message : "Error in update "+username
        });
    }
}

module.exports = {
    postLogin,
    getUserManage,
    postUserManage,
    enableDisableUser,
    getUpdateUser,
    putUserData
}
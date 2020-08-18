const nodemailer = require('nodemailer');
const userModel = require('../../models/InventoryShoppingManage/userManage.model');
const clientUserModel = require('../../models/ShoppingCartManage/clientUserManage.model');
let keyLogger = new Array();


async function sendEmail(contentHTML, toEmail, subjectEmail) {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ac8794572@gmail.com",
            pass: "crespo@123"
        },
        tls: { rejectUnauthorized: false }
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log("Error connection to gmail", error);
        } else {
            console.log("Server is ready to take our messages", success);
        }
    });
    const info = await transporter.sendMail({
        from: "Catbol E-commerce Server",
        to: toEmail,
        subject: subjectEmail,
        html: contentHTML
    });
    console.log("info the email: ", info);
    return info;
}

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

const restoreData = async (req, res) => {
    try {
        const { email } = req.body;
        const isUserAdmin = await userModel.existsUser(email);
        const isClientUser = await clientUserModel.existsUser(email);
        console.log(isClientUser, isUserAdmin);
        if (isClientUser || isUserAdmin) {
            const numRandom = parseInt(Math.floor((Math.random() * 999999) + 111111), 16); //Generate Key Randomize for confirm code
            const key = numRandom.toString(15);
            keyLogger.push({
                key,
                email
            });
            contentHTML = `<p>Usuario Catbol. <br>
                                Este es tu codigo de verificación <b>${key}</b> <br>
                                <a href="http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/verify_key">Porfavor, sigue este enlace para restaurar tu cuenta</a> Gracias.
                            </p>`;
            const info = await sendEmail(contentHTML, email, 'Restauración de usuario');
            console.log('status email sent:', info);
            res.json({
                message : "EL correo de verificación fue enviado correctamente"
            });
        } else {
            res.json({
                message : "EL correo de verificación no pudo enviarse, intente de nuevo porfavor"
            });
        }
    } catch (error) {
        console.error(error, "error in process send email for recovery account");
        res.json({
            message : "EL correo de verificación no pudo enviarse, intente de nuevo porfavor"
        });
    }
}

const verifyPassword = async (req, res) => {
    const { key } = req.body;
    console.log(key);
    let emailToSend;
    for (let index = 0; index < keyLogger.length; index++) {
        if (await key === keyLogger[index].key) {
            keyLogger[index].key = "@%RST#";
            emailToSend = keyLogger[index].email;
            console.log(emailToSend, "success");
            console.log("pise aqui Otra vez", emailToSend);
            res.status(200).json({
                message : true,
                email : emailToSend
            });
            return;
        }
    }
    console.log("saliendo for",emailToSend)
    if (emailToSend==null) {
        console.log("pise aqui");
        res.status(200).json({
            message : false,
            email : null
        })
    }
}

const postNewPassword = async (req, res) => {
    const {password} = req.body;
    const {email} = req.params;
    if (await userModel.saveNewPassword(email, password)) {
        res.json({
            message : "password saved successfully"
        });
    } else {
        res.json({
            message : "password not saved"
        });
    }
}

module.exports = {
    postLogin,
    getUserManage,
    postUserManage,
    enableDisableUser,
    getUpdateUser,
    putUserData,
    restoreData,
    verifyPassword,
    postNewPassword
}
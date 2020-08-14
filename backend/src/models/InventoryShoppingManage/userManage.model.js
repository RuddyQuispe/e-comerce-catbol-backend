const pool = require('../../database');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');

async function verifyPassword(id ,password){
    try {
        const json_password = await fs.readFileSync(path.join(__dirname,'../../../../security/password.json'), 'utf-8');
        let listPassword = await JSON.parse(json_password);
        for (let index = 0; index < listPassword.length; index++) {
            let a = await matchPassword(password, listPassword[index].pass);
            console.log(a);
            if (listPassword[index].id == id && a) {
                console.log("pise", listPassword[index].type);
                return listPassword[index].type;
            }
        }
        return -1;
    } catch (error) {
        console.log(error);
        return -1;
    }
}

async function writePassword(id, newPassword){
    try {
        const json_password = await fs.readFileSync(path.join(__dirname,'../../../../security/password.json'), 'utf-8');
        let listPassword = await JSON.parse(json_password);
        let newListPassword = [];
        for (let index = 0; index < listPassword.length; index++) {
            if (listPassword[index].id == id) {
                console.log("pise", listPassword[index].type);
                let jsonDataNew = {
                    "id": id,
                    "pass": await encryptPassword(newPassword),
                    "type": listPassword[index].type
                }
                await newListPassword.push(jsonDataNew);
            }else{
                await newListPassword.push(listPassword[index]);
            }
        }
        const json_write = JSON.stringify(newListPassword);
        const response = await fs.writeFile(path.join(__dirname,'../../../../security/password.json'), json_write, error => {
            if (error) {
                console.error("Error in write passwordOwner.json");
                console.log(error);
                return false;
            } else {
                console.log('successfully writing to passwordOwner.json');
                return true;
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function encryptPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    console.log(hash);
    return hash;
}

async function matchPassword(password, passwordCompare) {
    return await bcryptjs.compare(password, passwordCompare);
}

async function savePassword(id, password, type){
    const json_password = fs.readFileSync(path.join(__dirname,'../../../../security/password.json'), 'utf-8');
    let passwordList = JSON.parse(json_password);
    let newPass = {
        id: id,
        pass: password,
        type: type
    }
    passwordList.push(newPass);
    const json_write = JSON.stringify(passwordList);
    await fs.writeFile(path.join(__dirname,'../../../../security/password.json'), json_write, error => {
        if (error) {
            console.error("Error in write password.json");
            console.log(error);
            return false;
        } else {
            console.log('successfully writing to password.json');
        }
    })
    return true;
}

module.exports = {
    async getListUserAdmin(){
        try {
            const userList = await pool.query(`select * from "user"`);
            return userList.rows;
        } catch (error) {
            console.log("Error in user Manage",error);
            return null;
        }
    },

    async registerUserAdmin(username, roleDescription, email, password){
        try {
            const response = await pool.query(`select register_user('${username}', '${email}', '${roleDescription}')`);
            let passwordCrypt = await encryptPassword(password);
            if (await savePassword(response.rows[0].register_user, passwordCrypt, 0)) {
                console.log("saved password successfully");
            }else{
                console.log("not saved password");
            }
            return response.rows[0].register_user;
        } catch (error) {
            console.log("Error in register user",error);
            return -1;
        }
    },

    async enableDisableUser(idUser){
        try {
            await pool.query(`update "user" set status=not status where id=${idUser}`);
            return true;
        } catch (error) {
            console.log("Error in enable disable user");
            return false;
        }
    },

    async verifyUserPassword(email, password){
        try {
            const response = await pool.query(`select getIdUser('${email}')`);
            console.log("asgkj", response.rows[0].getiduser);
            if (response.rows[0].getiduser==-1) {
                console.log("ninguno");
                return -1;
            } else {
                console.log("auqi");
                const userData = await verifyPassword(response.rows[0].getiduser, password);
                console.log("us", userData);
                return userData;
            }
        } catch (error) {
            console.log(error, "error in login");
            return -1;
        }
    },

    async getIdUser(email){
        try {
            const response = await pool.query(`select id from "user" where email='${email}'`);
            return response.rows[0].id;
        } catch (error) {
            console.log("error in getIdUser", error);
            return -1;
        }
    },

    async getUserData(id){
        try {
            const response = await pool.query(`select * from "user" where id=${id}`);
            return response.rows[0];
        } catch (error) {
            console.log("error in getIdUser", error);
            return -1;
        }
    },

    async updateUser(id, email, username, role){
        try {
            await pool.query(`update "user" set username='${username}', email='${email}', rol_description='${role}' where id=${id}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async existsUser(email) {
        try {
            const response = await pool.query(`select count(*) from "user" where email='${email}'`);
            return response.rows[0].count>0? true : false;
        } catch (error) {
            console.log("Error in search user", error);
            return false;
        }
    },

    async saveNewPassword(email, newPassword){
        try {
            const response = await pool.query(`select getIdUser('${email}')`);
            console.log("id or CI", response.rows[0].getiduser);
            if (response.rows[0].getiduser==-1) {
                console.log("ninguno");
                return false;
            } else {
                console.log("aaaaaa");
                const userData = await writePassword(response.rows[0].getiduser, newPassword);
                console.log("us", userData);
                return true;
            }
        } catch (error) {
            console.log(error, "error in login");
            return false;
        }
    }
}
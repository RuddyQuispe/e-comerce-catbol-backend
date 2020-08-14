const pool = require('../../database');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');

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

async function encryptPassword(password) {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    console.log(hash);
    return hash;
}

module.exports = {
    async getDataClientUser(ci){
        try {
            const response = await pool.query(`select * from client_user where ci=${ci}`);
            return response.rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getCIClientUser(email){
        try {
            const response = await pool.query(`select ci from client_user where email='${email}'`);
            console.log(response.rows[0]);
            return response.rows[0].ci;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getListUser(){
        try {
            const response = await pool.query(`select ci, first_name, last_name, email, phone, address, province, city, status from client_user`);
            return response.rows;
        } catch (error) {
            console.log("Error in get list client user", error);
            return null;
        }
    },

    async registerClientUser(ci, firstName, lastName, email, phone, address, province, city, password){
        try {
            const response = await pool.query(`select register_user_client(${ci}, '${firstName}', '${lastName}', '${email}', '${phone}', '${address}', '${province}', '${city}')`);
            if (response.rows[0].register_user_client) {
                console.log("Saved Account successfully");
                let passwordCrypt = await encryptPassword(password);
                if (await savePassword(ci, passwordCrypt, 1)) {
                    console.log("saved password successfully");
                    return true;
                }else{
                    console.log("not saved password");
                    return false;
                }
            } else {
                console.log("Not Saved Account");
                return false;
            }
        } catch (error) {
            console.log("Error in regisrerclient User", error);
            return false;
        }
    },

    async enableDisableClientUser(idUser){
        try {
            await pool.query(`update client_user set status= not status where ci=${idUser}`);
            return true;
        } catch (error) {
            console.log("Error in enable Disable Client User", error);
            return false;
        }
    },

    async existsUser(email) {
        try {
            const response = await pool.query(`select count(*) from client_user where email='${email}'`);
            return response.rows[0].count>0? true : false;
        } catch (error) {
            console.log("Error in search user", error);
            return false;
        }
    },

    async getReportClientFrequent(){
        try {
            const response = await pool.query(`select cu.ci, cu.first_name, cu.last_name, count(distinct i.invoice_no) as count_sale_note from client_user cu, shopping_cart sc, sale_note sn, invoice i where cu.ci=sc.ci and sc.id_shopping_cart=sn.id_shopping_cart and sn.code_sale=i.code_sale group by cu.ci`);
            return response.rows;
        } catch (error) {
            console.log("Error in get report client frequent", error);
            return null;
        }
    },

    async getReportPayment(){
        try {
            const responseDelivery = await pool.query(`select get_report_payment_delivery()`);
            const responseWeb = await pool.query(`select get_report_payment_web()`);
            return [
                {
                    payment_web : responseWeb.rows[0].get_report_payment_web,
                    payment_delivery : responseDelivery.rows[0].get_report_payment_delivery
                }
            ];
        } catch (error) {
            console.log("Error in get Report Payment", error);
            return 
        }
    }
}
const fs = require('fs');
const path = require('path');

const getBitacoraManage = async (req, res) => {
    const json_bitacora = fs.readFileSync(path.join(__dirname,'../../../../security/bitacora.json'), 'utf-8');
    let bitacoraList = JSON.parse(json_bitacora);
    res.json(bitacoraList);
}

const writeBitacora = async (username, activity) => {
    const json_bitacora = fs.readFileSync(path.join(__dirname,'../../../../security/bitacora.json'), 'utf-8');
    let bitacoraList = JSON.parse(json_bitacora);
    let today = new Date();
    let dateTime = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let newActivity = {
        username,
        date: dateTime,
        activity,
    }
    bitacoraList.push(newActivity);
    const json_write = JSON.stringify(bitacoraList);
    await fs.writeFile(path.join(__dirname,'../../../../security/bitacora.json'), json_write, error => {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('successfully writing to bitacoraOwner.json');
        }
    })
    return true;
}

module.exports = {
    getBitacoraManage,
    writeBitacora
}
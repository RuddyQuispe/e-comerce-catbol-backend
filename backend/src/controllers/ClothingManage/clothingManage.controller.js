const clothingModel = require('../../models/ClothingManage/clothingManage.model');

const getClothingManage = async (req, res) => {
    const clothingList = await clothingModel.getListClothing();
    res.json({
        clothing_list : clothingList
    });
}

const postClothing = async (req, res) => {
    const {description, characteristics, color, cost, discount, list_size} = req.body;
    var array = list_size.split(',');
    const idClothing = await clothingModel.registerClothing(description, `http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/img/${req.file.filename}`, characteristics, color);
    if (idClothing > 0) {
        for (let index = 0; index < array.length; index++) {
            if (await clothingModel.registerClothingCost(array[index], idClothing, cost, discount)) {
                console.log("register successfully", array[index]);
            }else{
                console.log("Error in register", array[index]);
            }
        }
        res.json({
            message : 'Saved Successfully'
        });
    }else{
        res.json({
            message : 'Problems to save clothing'
        });
    }
}

const getPutClothing = async (req, res) => {
    const {code_clothing, id_size} = req.params;
    const dataClothing = await clothingModel.getDataClothing(code_clothing, id_size);
    res.json({
        data_clothing : dataClothing
    });
}

const putClothing = async (req, res) => {
    const {description, characteristics, color, cost, discount} = req.body;
    const {code_clothing, id_size} = req.params;
    if (await clothingModel.updateClothing(code_clothing, id_size, description, characteristics, color, cost, discount, `http://ec2-54-232-175-236.sa-east-1.compute.amazonaws.com:4000/img/${req.file.filename}`)) {
        res.json({
            message : `${description} fue actualizado correctamente.`
        });
    } else {
        res.json({
            message : `Error al actualizar ${description}.`
        });
    }
}

const putEnableDisable = async (req, res) => {
    const {code_clothing} = req.body;
    if (await clothingModel.enableDisableClothing(code_clothing)) {
        res.json({
            message : `codigo: ${code_clothing} se cambio su estado correctamente`
        })
    } else {
        res.json({
            message : `codigo: ${code_clothing} nose pudo cambiar su estado`
        })
    }
}

const getClothingGroup = async (req, res) => {
    const {code} = req.params;
    const listGroupClothing = await clothingModel.getListClothingSubGroup(code);
    const clothingData = await clothingModel.getClothingDataOnly(code);
     res.json({
        list_clothing_group : listGroupClothing,
        clothing_data : clothingData
     });
}

const postClothingGroup = async (req, res) => {
    console.log(req.params, req.body);
    const {list_code_clothing} = req.body;
    let value = true;
    for (let index = 0; index < list_code_clothing.length; index++) {
        if (await clothingModel.registerClothingGroup(req.params.code, list_code_clothing[index])) {
            console.log(`register clothing group SUPER ${req.params.code} SUB: ${list_code_clothing[index]} successfully`);
        }else{
            value = false;
            console.log(`Error clothing group SUPER ${req.params.code} SUB: ${list_code_clothing[index]} Error.`);
        }
    }
    if (value) {
        res.json({
            message : `Las prendas ha sido registradas al conjunto correctamente`
        });
    }else{
        res.json({
            message : `Alguna prendas no han sido registradas correctamente`
        });
    }
}

module.exports= {
    postClothing,
    getClothingManage,
    getPutClothing,
    putClothing,
    putEnableDisable,
    getClothingGroup,
    postClothingGroup
}
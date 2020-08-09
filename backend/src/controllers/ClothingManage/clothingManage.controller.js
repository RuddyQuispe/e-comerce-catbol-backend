const clothingModel = require('../../models/ClothingManage/clothingManage.model');
const { json } = require('express');

const getClothingManage = async (req, res) => {
    const clothingList = await clothingModel.getListClothing();
    res.json({
        clothing_list : clothingList
    });
}

const postClothing = async (req, res) => {
    const {description, characteristics, color, cost, discount, list_size} = req.body;
    var array = list_size.split(',');
    const idClothing = await clothingModel.registerClothing(description, `http://localhost:4000/img/${req.file.filename}`, characteristics, color);
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
    if (await clothingModel.updateClothing(code_clothing, id_size, description, characteristics, color, cost, discount, `http://localhost:4000/img/${req.file.filename}`)) {
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

module.exports= {
    postClothing,
    getClothingManage,
    getPutClothing,
    putClothing,
    putEnableDisable
}
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

module.exports= {
    postClothing,
    getClothingManage
}
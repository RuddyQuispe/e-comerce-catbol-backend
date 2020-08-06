const sizeModel = require('../../models/ClothingManage/sizeManage.model');

const getSize = async (req, res) => {
    const sizeList = await sizeModel.getListOptionsSize();
    res.json({
        size_list : sizeList
    });
}

const postSize = async (req, res) => {
    const idSize = await sizeModel.registerSize(req.body.size);
    if (idSize>0) {
        res.json({
            message : `El Registro de la talla ${req.body.size} fue exitoso ID: ${idSize}`
        });
    } else {
        res.json({
            message : `El Registro de la talla ${req.body.size} falló, probablemente ya existe`
        });
    }
}

module.exports = {
    getSize,
    postSize
}
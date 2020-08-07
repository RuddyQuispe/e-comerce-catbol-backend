const pool = require('../../database');

module.exports = {
    async getListOptionsClothing(){
        try {
            const response = await pool.query(`select c.code_clothing, c.description, c.color from clothing c, clothing_group cg where c.estatus and cg.code_clothing_super<>c.code_clothing group by c.code_clothing order by c.description`);
            return response.rows;
        } catch (error) {
            console.log("Error in get list options clothing");
            return null;
        }
    },

    async registerClothing(description, image_name, characteristics, color){
        try {
            const response = await pool.query(`select register_clothing('${description}', '${image_name}', '${characteristics}', '${color}')`);
            return response.rows[0].register_clothing;
        } catch (error) {
            console.log("Error in register clothing", error);
            return -1;
        }
    },

    async registerClothingCost(idSize, codeClothing, price, discount) {
        try {
            const response = await pool.query(`select register_size_clothes(cast(${idSize} as smallint), ${codeClothing}, cast(${price} as decimal(12,2)), cast(${discount} as decimal(12,2)))`);
            return response.rows[0].register_size_clothes;
        } catch (error) {
            console.log("Erro in register cost, discount, size", error);
            return false;
        }
    },

    async getListClothing(){
        try {
            const response = await pool.query(`select c.code_clothing, sc.id_size, c.description as description_clothing, c.image_name, c.characterists, c.color, sc.price, sc.discount, sc.stock, s.description as size_clothing from clothing c, size_clothes sc, "size" s where c.code_clothing=sc.code_clothing and sc.id_size=s.id`);
            return response.rows;
        } catch (error) {
            console.log("Error in GET clothing List", error);
            return null;
        }
    }
}
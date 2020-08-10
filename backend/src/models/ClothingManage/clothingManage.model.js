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
            const response = await pool.query(`select c.code_clothing, sc.id_size, c.description as description_clothing, c.image_name, c.characterists, c.color, sc.price, sc.discount, sc.stock, s.description as size_clothing, c.estatus from clothing c, size_clothes sc, "size" s where c.code_clothing=sc.code_clothing and sc.id_size=s.id`);
            return response.rows;
        } catch (error) {
            console.log("Error in GET clothing List", error);
            return null;
        }
    },

    async getDataClothing(codeClothing, idSize){
        try {
            const response = await pool.query(`select c.description, c.characterists, c.color, sc.price, sc.discount from clothing c, size_clothes sc where c.code_clothing=sc.code_clothing and c.code_clothing=${codeClothing} and sc.id_size=${idSize}`);
            return response.rows[0];
        } catch (error) {
            console.log("Error in get Data Clothing", error);
            return null;
        }
    },

    async updateClothing(codeClothing, idSize ,description, characteristics, color, cost, discount, imageFile) {
        try {
            await pool.query(`update clothing set description='${description}', characterists='${characteristics}', color='${color}', image_name='${imageFile}' where code_clothing=${codeClothing}`);
            console.log('Updated Clothing');
            await pool.query(`update size_clothes set price=cast(${cost} as decimal(12,2)), discount=cast(${discount} as decimal(12,2)) where code_clothing=${codeClothing} and id_size=${idSize}`);
            console.log('update price and discount');
            return true;
        } catch (error) {
            console.log("Error in update clothing", error);
            return false;
        }
    },

    async enableDisableClothing(codeClothing){
        try {
            await pool.query(`update clothing set estatus = not estatus where code_clothing=${codeClothing}`);
            return true;
        } catch (error) {
            console.log("Error in ebale disbale clothing", error);
            return false;
        }
    },

    async getListClothingSubGroup(codeClothing){
        try {
            const response = await pool.query(`select code_clothing, description, characterists, image_name, color, estatus, false as checked from clothing where code_clothing<>${codeClothing} and code_clothing not in (select distinct code_clothing_super from clothing_group)`);
            return response.rows;
        } catch (error) {
            console.log("Error in get clothing Group", error);
            return null;
        }
    },

    async getClothingDataOnly(codeClothing) {
        try {
            const response = await pool.query(`select code_clothing, description, image_name, characterists, color, estatus from clothing where code_clothing=${codeClothing}`);
            return response.rows[0];
        } catch (error) {
            console.log("Error in get Data pnly clothing", error);
            return null;
        }
    },

    async registerClothingGroup(codeClothingSuper, codeClothingSub){
        try {
            const response = await pool.query(`select register_cloting_group(${codeClothingSuper}, ${codeClothingSub})`);
            return response.rows[0].register_cloting_group;
        } catch (error) {
            console.log("Error in register clothing Group: CODES:", codeClothingSuper, codeClothingSub, error);
            return false;
        }
    }
}
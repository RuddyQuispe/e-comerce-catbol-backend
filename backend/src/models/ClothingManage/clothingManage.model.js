const poll = require('../../database');

module.exports = {
    async getListOptionsClothing(){
        try {
            const response = await poll.query(`select c.code_clothing, c.description, c.color from clothing c, clothing_group cg where c.estatus and cg.code_clothing_super<>c.code_clothing group by c.code_clothing order by c.description`);
            return response.rows;
        } catch (error) {
            console.log("Error in get list options clothing");
            return null;
        }
    }
}
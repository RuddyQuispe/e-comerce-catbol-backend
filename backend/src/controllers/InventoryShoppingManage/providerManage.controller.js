const providerModel = require('../../models/InventoryShoppingManage/providerManage.model');

getProviderManage = async (req, res) => {
    const provider_list = await providerModel.getLisProvider();
    res.json(provider_list);
};

postProviderManage = async  (req, res) => {
    const {ci_nit, name, phone, address, email} = req.body;
    if (await providerModel.registerProvider(ci_nit, name, phone, address, email)) {
        res.json({
            message : `the provider ${name} is register successfully`
        });
    }else{
         res.json({
             message : `I have problems to register ${name}`
         });
    }
};

module.exports = {
    getProviderManage,
    postProviderManage
};
const pool = require('../../database');

module.exports = {
    async registerInvoice(codeSale, costTotal, ivaTax, sendCost){
        try {
            console.log(codeSale, costTotal, ivaTax);
            const response = await pool.query(`select register_invoice(${codeSale}, cast(${costTotal} as decimal(12,2)), cast(${ivaTax} as decimal(12,2)), cast(${sendCost} as decimal(12,2)))`);
           return response.rows[0].register_invoice;
        } catch (error) {
            console.log("Error in register invoice", error);
            return -1;
        }
    },

    async getListInvoice(){
        try {
            const response = await pool.query(`select i.invoice_no, cu.first_name, cu.last_name, i.total_cost, i.iva_tax, i.send_cost, ds."name", sn.status_sale from invoice i, sale_note sn, shopping_cart sc, client_user cu, delivery_staff ds where i.code_sale=sn.code_sale and sn.id_shopping_cart=sc.id_shopping_cart and sc.ci=cu.ci and sn.code_delivery=ds.code_delivery`);
            return response.rows;
        } catch (error) {
            console.log("Error in get list invoice", error);
            return null;
        }
    },

    async getDataInvoice(invoiceNo){
        try {
            const response = await pool.query(`select i.invoice_no, sn.code_sale, sn.corporate, sn.nit, i.send_cost, i.total_cost, i.iva_tax, sn.person_receive from invoice i, sale_note sn where i.code_sale=sn.code_sale and i.invoice_no=${invoiceNo}`);
            return response.rows[0];
        } catch (error) {
            console.log("Error in get data invoice", error);
            return null;
        }
    },

    async getListShoppingInvoice(invoiceNo){
        try {
            const response = await pool.query(`select c2.code_clothing, c2.description, s2.description as size_description, sl.quantity, sl.subtotal from invoice i, sale_note sn, shopping_cart sc, shopping_list sl, size_clothes sc2, clothing c2, "size" s2 where i.code_sale=sn.code_sale and sn.id_shopping_cart=sc.id_shopping_cart and sc.id_shopping_cart=sl.id_shopping_cart and sl.code_clothing=sc2.code_clothing and sl.id_size=sc2.id_size and sc2.code_clothing=c2.code_clothing and sc2.id_size=s2.id and i.invoice_no=${invoiceNo}`);
            return response.rows;
        } catch (error) {
            console.log("Error in get Shopping List Invoice", error);
            return null;
        }
    }
}
const htmlPDF = require('html-pdf'); 
const couponModel = require('../../models/ShoppingCartManage/couponManage.model');
const saleNoteModel = require('../../models/ShoppingCartManage/saleNoteManage.model');
const invoiceModel = require('../../models/ShoppingCartManage/invoiceManage.model');
const path = require('path');

const postRegisterInvoice = async (req, res) => {
    const {code_sale} = req.body;
    const ciClient = await saleNoteModel.getOwnerSaleNote(code_sale);
    const porCoupon = await couponModel.getLastCoupon(ciClient);
    const subTotal = await saleNoteModel.getTotalCost(code_sale);
    const city = await saleNoteModel.getCitySaleNoteToSend(code_sale);
    let cost = 0;
    switch (city) {
        case "Cotoca": 
            cost=40;
            break;
        case "La Guardia": 
            cost=30;
            break;
        case "Paurito": 
            cost=40;
            break;
        case "El Torno": 
            cost=30;
            break;
        case "Okinawa": 
            cost=40;
            break;
        case "San Matias": 
            cost=50;
            break;
        case "Chihuahua": 
            cost=50;
            break;
        case "Pailas": 
            cost=50;
            break;
        case "Pailon": 
            cost=50;
            break;
        case "San Jose de Chiquitos": 
            cost=50;
            break;
        case "Mairana": 
            cost=40;
            break;
        case "Samaipata": 
            cost=45;
            break;
        default:
            cost=0;
            break;
    }
    let iva = (subTotal/100)*13;
    let minusCoupon = (subTotal/100)*porCoupon;
    let costTotal1 = 0;
    costTotal1 = (parseFloat(subTotal) + parseFloat(iva) - parseFloat(minusCoupon));
    console.log(costTotal1, subTotal, iva, minusCoupon);
    const invoice_no = await invoiceModel.registerInvoice(code_sale, costTotal1, iva, cost);
    if (invoice_no>0) {
        res.json({
            message : `Se generó correctamente la factura #${invoice_no}`
        });
    }else{
        res.json({
            message : `Hubo problemas al generar la factura, intente de nuevo o llame a soporte`
        });
    }
}

const getInvoiceManage = async (req, res) => {
    const listInvoice = await invoiceModel.getListInvoice();
    res.json(listInvoice);
}

const getInvoiceOnly = async (req, res) => {
    const {invoice_no} = req.body;
    const dataInvoice = await invoiceModel.getDataInvoice(invoice_no);
    const ownerCI = await saleNoteModel.getOwnerSaleNote(dataInvoice.code_sale);
    const couponDiscount = await couponModel.getLastCoupon(ownerCI);
    const shoppingList = await invoiceModel.getListShoppingInvoice(invoice_no);
    let invoicePDF = `<tbody>`;
    for (let index = 0; index < shoppingList.length; index++) {
        invoicePDF = await invoicePDF + `
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${shoppingList[index].code_clothing}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${shoppingList[index].description}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${shoppingList[index].size_description}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${shoppingList[index].quantity}</td>
            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">${shoppingList[index].subtotal}</td>
        </tr>`;
    }
    invoicePDF = invoicePDF + `</tbody>`;
    let contentHTML = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Factura #${invoice_no}</title>
    </head>
    <body>
        <div id="pageHeader">
            <h5 style="text-align: center;"><b>Factura #${invoice_no}</b></h5>
        </div>
        <h2 style="text-align: center;">Detalles de Factura</h2>
        <div style="padding: 5%;">
            <p>
                <b>CI del Cliente: </b> ${ownerCI}<br>
                <b>Razon Social: </b> ${dataInvoice.corporate}<br>
                <b>NIT: </b> ${dataInvoice.nit}<br>
                <b>Persona quien Recibe Entrega: </b> ${dataInvoice.person_receive}<br>
                <b>Costo de envío: </b> ${dataInvoice.send_cost}<br>
                <b>impuesto IVA: </b> ${dataInvoice.iva_tax} <br>
                <b>Total costo: </b> ${dataInvoice.total_cost} <br>
                <b>Descuento Cupón: </b> ${dataInvoice.coupon_discount} %<br>
                <br>
                <br>
            </p>
            <table style="border: 1px solid black; border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse;">#</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Ropa</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Talla</th>
                        <th style="border: 1px solid black; border-collapse: collapse;">Cantidad</th>
                    </tr>
                </thead>
                ${invoicePDF}
            </table>
            <div id="pageFooter" style="text-align: center;">
                <b>printed by: </b>${'username'}
            </div>
        </div>
    </body>
    </html>
    `;
    var filePath = await path.join(__dirname, `../../../../security/${invoice_no}.pdf`);
    console.log(filePath);
    await htmlPDF.create(contentHTML).toFile(filePath, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    setTimeout(function(){
        res.sendFile(path.join(__dirname, `../../../../security/${invoice_no}.pdf`));
    },5000);
}

module.exports = {
    postRegisterInvoice,
    getInvoiceManage,
    getInvoiceOnly
}
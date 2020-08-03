const express = require('express');     //EC 5 Commons JS
const cors = require('cors');
const morgan = require('morgan');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);


//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



//Routes
app.use(require('./routes/InventoryShoppingManage/userManage.route'));
app.use(require('./routes/InventoryShoppingManage/providerManage.route'));
app.use(require('./routes/InventoryShoppingManage/entryNoteManage.route'));


module.exports = app;
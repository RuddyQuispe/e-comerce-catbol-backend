const express = require('express');     //EC 5 Commons JS
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//Initializations
const app = express();
const storage = multer.diskStorage({
    destination: path.join(__dirname,'./uploads'),
    filename: (req,file,cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname).toLowerCase()); 
    }
});

//Settings
app.set('port', process.env.PORT || 4000);


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(multer({
    storage: storage,
}).single('image'));

//Static Files
app.use(express.static(path.join(__dirname,'/src/uploads')));


//Routes
app.use(require('./routes/InventoryShoppingManage/userManage.route'));
app.use(require('./routes/InventoryShoppingManage/providerManage.route'));
app.use(require('./routes/InventoryShoppingManage/entryNoteManage.route'));
app.use(require('./routes/InventoryShoppingManage/inventoryManage.route'));
app.use(require('./routes/InventoryShoppingManage/bitacoraManage.route'));
app.use(require('./routes/ClothingManage/sizeManage.route'));
app.use(require('./routes/ClothingManage/clothingManage.route'));
app.use(require('./routes/ClothingManage/categoryManage.route'));


module.exports = app;
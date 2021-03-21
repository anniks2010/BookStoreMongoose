//const path =require('path');
///const rootDirectory=require('../utilities/path');
const express=require('express');
const router =express.Router();
const adminController=require('../controllers/adminController');
//const products =[];
///mini app pluggable to another express app

router.get('/add-product',adminController.getAddProduct);
   ///res.sendFile(path.join(__dirname, '..', 'views','add-product.html'));
   ///res.sendFile(path.join(rootDirectory,'views','add-product.html'));

router.get('/products', adminController.getProducts);
router.post('/add-product',adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);

///module.exports=router;
module.exports=router;



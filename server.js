const express=require('express');
///const path=require('path');
const ejs=require('ejs');
const bodyParser=require('body-parser');
/// mongo ühendus tuleb luua enne routes
const mongoConnect =require('./utilities/db').mongoConnect;

const User =require('./models/user');

///const rootDirectory=require('./utilities/path');
const adminRouter = require('./routes/admin');
const shopRouter =require('./routes/shop');
const app= express();

app.set('view engine',ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

///pean kasutaja looma enne, kui routes lähevad käima
app.use((req,res, next)=>{
    User.findById("603fd9ccbd83e854b2af92f7")
    .then(user=>{
        console.log(user);
        req.user = new User(user.name, user.email, user.cart, user._id);
        next(); ///see ütleb, et kui oled lõpetanud, siis kuku alla poole ja jookse edasi.
    })
    .catch(error=>{
        console.log(error);
    });
});

app.use('/admin', adminRouter); ///admin is a filter
app.use(shopRouter);

app.use((req,res)=>{
    res.render('404.ejs', {pageTitle: 'Page not found', path: ''});
    ///res.status(404).sendFile(path.join(rootDirectory,'views','404.html'));
});

/*app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
});*/

mongoConnect(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running on Port 3000');
    });
});
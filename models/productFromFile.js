const fs=require('fs');  ///fs=fileSystem
const path=require('path');
const Cart =require('./cart');
const filePath=path.join(path.dirname(require.main.filename),'data','products.json');

const getProductsFromFile=(cb)=>{
    fs.readFile(filePath,(error,fileContent)=>{
        if(error){
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports=class Product{
    constructor(id,title, url, price, description){
        this.id=id;
        this.title=title;
        this.imageUrl=url;
        this.price=price;
        this.description=description;
    }

    save(){ ///save to products.json
        getProductsFromFile(products =>{
            if(this.id){ ///if product with this id exists
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products]; ///pull out existing products and store them in a new array. Spread operator
                updatedProducts [existingProductIndex]=this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts),(error)=>{
                    console.log(error);
                });
            }else{
                this.id=Math.random().toString();
                products.push(this);
                fs.writeFile(filePath,JSON.stringify(products),(error)=>{
                    console.log(error);
                });
            }
            

        });
    }

    static fetchAll(cb){  ///cb on objekt, kuhu süsteem salvestab faili sisu
        getProductsFromFile(cb);
    }
    static findById(id, cb){
        getProductsFromFile(products=>{
            ///filter a product by its id
            const product=products.find(p=> p.id==id);
            cb(product);
        });
    }
    static deleteById(id){
        getProductsFromFile(products =>{
            const product= products.find(productInArray => productInArray.id===id); ///see on nagu forEachiga loopimine
            const updatedProduct = products.filter(product => product.id !== id);
            fs.writeFile(filePath, JSON.stringify(updatedProduct), (error)=>{
                if(!error){
                    console.log("File updated!");
                    Cart.deleteProduct(product.id, product.price);
                }
            });
        });
    }

}
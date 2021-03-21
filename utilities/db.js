const mongodb =require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; //altkriipsuga märgitakse muutujaid, mida kasutatakse selle klassi sees.

const mongoConnect =(cb)=>{
    MongoClient.connect('mongodb://localhost:27017/BookStoreDB', {useUnifiedTopology: true}).then(client=>{
        console.log('connected');
        _db =client.db();
        cb();
    })
    .catch(error=>{
        throw error;
    });
}

const getDb = ()=>{
    if(_db){
        return _db; ///returns the connection
    }
    throw "No db found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb =getDb;
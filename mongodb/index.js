const {MongoClient} = require("mongodb")


const client = new MongoClient('mongodb://127.0.0.1:27017')


const clientFun = async function(c) {
    await client.connect()
    const db = client.db('mytest')
    return db.collection(c)
}

const main = async()=>{
    var cc = await clientFun('cc')
    // var d = await cc.find()
    // var d  = await cc.insertOne({username:'cdz',age:50})
    // var d  = await cc.insertMany([
    //     {username:'cdz1',age:21},
    //     {username:'cdz2',age:22},
    //     {username:'cdz3',age:23},
    //     {username:'cdz4',age:24}
    // ])
    // const d = await cc.findOne({age:{$gt:22}})
    // const d = await cc.find({age:{$gt:15}})
    // const d = await cc.updateOne({username:"cdz2"},{$set:{age:21}})
    // const d = await cc.updateMany({age:21},{$set:{username:"cs"}})
    // const d = await cc.deleteOne({username:"cdz3"})
    const d = await cc.deleteMany({age:{$gt:20}}) 

    // console.log('d',await d.toArray());
    console.log('d',await d);
    
}

main().finally(()=>client.close())
const {json,urlencoded} = require('express')
const db = require('./db')
const express = require("express")
// const fs = require('fs')
// const { promisify } = require('util')
// const readFile =  promisify(fs.readFile)
// const writeFile =  promisify(fs.writeFile)
const app = express()
// app.use(express.urlencoded())
app.use(express.json())

app.get('/', async function(req,res){
    try{
        // let back = await readFile("./db.json",'utf8')
        let back = await db.getDb()

        // const jsonObj = JSON.parse(back)
        res.send(back.users)
    }catch(error){
        res.status(500).json({error})
    }
})
app.post('/',async function(req,res){
    // console.log('req.headers', req.headers)
    // console.log('req.body', req.body)
    let body = req.body
    if(!body){
        res.status(403).json({
            error:"缺少数据信息"
        })
    }
    let jsonObj = await await db.getDb()
    // const jsonObj = JSON.parse(back)
    body.id = jsonObj.users[jsonObj.users.length-1].id + 1
    console.log('body',body);
    jsonObj.users.push(body)
    try{
        // let w = await writeFile('./db.json', JSON.stringify(jsonObj))
        let w = await db.saveDb(jsonObj)

        console.log('w', w);
        
        if(!w){
            res.status(200).json({
                msg:"添加成功"
            })
        }
    }catch(error){
        res.status(500).json({
            error
        })
    }
})
app.put('/:id',async function(req,res){
    console.log('req.params.id',typeof req.params.id);
    console.log('req.body',req.body);
    try{
        let userInfo = await db.getDb()
        let userId = Number.parseInt(req.params.id)
        let user = userInfo.users.find(item=>item.id===userId)
        if(!user){
            res.status(403).json({
                msg:"用户不存在"
            })
        }

        const body = req.body
        user.username = body.username?body.username:user.username
        user.age = body.age?body.age:user.age
        userInfo.users[userId-1] = user
        if(!await db.saveDb(userInfo)){
            res.status(201).json({
                msg:"修改成功"
            })
        }

    }catch(error){
        res.status(500).json({
            error
        })
    }
    
})

app.listen(3000,()=>{
    console.log('Run http://127.0.0.1:3000');
})
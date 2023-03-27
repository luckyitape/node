const express = require('express')


const app = express()

const PORT = process.env.PORT || 3000

// const logs = (req)=>{
//   console.log(`${req.method},${req.url},${Date.now()}`);
// }

app.use((req,res,next)=>{
  console.log(`${req.method},${req.url},${Date.now()}`);
  next()
})


// 挂载路由
app.get('/', (req,res)=>{
  res.send('/index')
})

app.get('/register', (req,res)=>{
  res.send('/register')
})

app.get('/login', (req,res)=>{
  res.send('/login')
})

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

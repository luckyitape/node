var fs = require("fs")
var url = require("url")
var controller = require("./controller")
module.exports = (req,res)=>{
     // 请求头参数
    // console.log('你好', req.method);
    // console.log('你好', url.parse(req.url,true).query.id);
    if (req.method == "GET") {
        if (req.url === '/') {
            controller.index(res)
        } else {
            fs.readFile('./tx.jpg', (err, data) => {
                if (!err) {
                    res.end(data)
                }
            })
        }
    } else if(req.method == "POST") {
        // 请求体参数
        // console.log('ppp', res);

        var data = ""
        req.on('data',function(d){
            // console.log(d)
            data += d
        })
        req.on('end', function(){
            // console.log(require('querystring').parse(data));
            // res.end()
            controller.user(require('querystring').parse(data),res)
        })
    }
}
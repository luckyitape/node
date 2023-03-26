// 1.导入http模块
var http = require("http")
var fs = require("fs")
var url = require("url")
var server = http.createServer()
server.listen(8080, function () {
    console.log('http:127.0.0.1:8080');
})
server.on('request', function (req, res) {
    // 请求头参数
    console.log('你好', req.method);
    if (req.method == "GET") {
        console.log('你好', url.parse(req.url,true).query.id);
        if (req.url === '/') {
            fs.readFile('./index.html', 'utf-8', (err, data) => {
                if (!err) {
                    res.write(data)
                    res.end()
                }
            })
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
            console.log(require('querystring').parse(data));
            res.end()
        })
    }

})
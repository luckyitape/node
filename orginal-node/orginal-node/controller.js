var fs = require("fs")
module.exports = {
    index(res){
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            if (!err) {
                res.write(data)
                res.end()
            }
        })
    },
    user(postData,res){
        // 业务逻辑代码
        console.log(postData);
        res.end()
    }
}
const express = require('express');

// 创建 express 应用
const app = express();

/**
 * 路由，应用如何响应请求的一中规则
 * 规则主要分为两部分：
 * 请求方法： get post ...
 * 请求路径： /， /user， /.*fly$/....
 * 例如： 响应 / 路径 的 post 请求
 * app.post('/', function(req, res) {
 *     res.send('hello node')
 * })
 */

// 监听 / 路径的 get 请求： 响应 / 路径 的 get 请求
app.get('/', function(req, res) {
    res.send('hello node')
})

/**
 * 中间件是一个函数，在请求和响应周期中被顺序调用
 */
// 创建 myLogger 中间件
const myLogger = function (req, res, next) {
    console.log('myLogger')
    next()
}

/**
 * 创建异常处理中间件， 处理请求中产生的的异常
 * 使用时要注意两点
 * 第一， 参数一个不能少，否则回被视为普通中间件
 * 第二， 中间件需要在请求之后引用
 */
const errorHandler = function (err, req, res, next) {
    console.log('errorHandler...')
    res.status(500)
    res.send('down...')
}


// 使用中间件， 中间件需要在响应结束前被调用
app.use(myLogger)
app.use(errorHandler)

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, function() {
    const { address, port } = server.address()
    console.log('Http启动成功： http://%S:%S', address, port)
})
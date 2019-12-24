const express = require('express');

// 创建 express 应用
const app = express();

/**
 * 中间件是一个函数，在请求和响应周期中被顺序调用
 * 创建一个中间件 myLogger
 */
const myLogger = function ( req, res, next ) {
    console.log('myLogger')
    next()
}

/**
 * 使用中间件
 * 中间件需要在响应结束前被调用
 */
app.use(myLogger)

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

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, function() {
    const { address, port } = server.address()
    console.log('Http启动成功： http://%S:%S', address, port)
})
const express = require('express');
const router = require('./router'); // router是我们自定义的一个中间件

// 创建 express 应用
const app = express();

// 在app.js中托管router
app.use('/', router)

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, function() {
    const { address, port } = server.address()
    console.log('Http启动成功： http://%S:%S', address, port)
})
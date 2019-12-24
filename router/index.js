const express = require('express');

const boom = require('boom');

const userRouter = require('./user');

const { CODE_ERROR } = require('../utils/constant');

// 注册路由
const router = express.Router();

router.get('/', function(req, res) {
    res.send('欢迎来到博烨空间');
});

// 通过 userRouter 来处理 /user 路由， 对路由进行解耦。 接口user开头的路径
router.use('/user', userRouter);

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则， 会拦截正常请求
 */
router.use((req, res, next) => {
    // boom.notFound 相当于new Error(), 将参数赋值给err.message
    next(boom.notFound('接口不存在'));
});

/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法参数不能少
 * 第二，方法必须放在路由最后
 */
router.use((err, req, res, next) => {
    console.log(err);
    const msg = (err && err.message) || '系统错误';
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
    res.status(statusCode).json({
        code: CODE_ERROR,
        msg,
        error: statusCode,
        errorMsg
    });

});

module.exports = router
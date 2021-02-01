var express = require('express');
var usersRouter = express.Router();
var {userModel, roles} = require('./db')
const {jwtMiddleware, setJWT, clearJWT} = require('../common/jwt')
const {userRouter} = require('./userRouter')
const {adminRouter} = require('./adminRouter')



usersRouter.use(jwtMiddleware('user'))

usersRouter.use('/u/a', adminRouter)
usersRouter.use('/u', userRouter)


module.exports = {usersRouter}


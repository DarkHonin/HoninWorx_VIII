var express = require('express');
var usersRouter = express.Router();
var {userModel, roles} = require('./db')
const {jwtMiddleware, getJWT} = require('../common/jwt')
const {userRouter} = require('./userRouter')
const {adminRouter} = require('./adminRouter')

usersRouter.use('/u/a', adminRouter)
usersRouter.use('/u', userRouter)

module.exports = {usersRouter, jwtCapture : jwtMiddleware('user', (res, body) => res.locals.currentUser = body)}


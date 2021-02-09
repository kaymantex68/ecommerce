const express = require('express')
const router = express.Router()

// import middleware 
const { authCheck } =require('../middlewares/auth')

// import controllers
const { createOrUpdateUser } = require("../controllers/auth")

router.post('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = router
const express= require('express')
const actions = require('../methods/actions')
const router=express.Router()

router.get('/',(req,res) => {
    res.send('Hello World')
})

router.get('/dashboard',(req,res) => {
    res.send('Dashboard')
})

//@desc adding a new user
//@route POST /adduser
router.post('/adduser', actions.addNew)
router.post('/authenticate',actions.authenticate )

module.exports = router
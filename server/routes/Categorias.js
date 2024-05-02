const express = require('express')
const router = express.Router()
const {Categorias} = require('../models')
const {valideToken} = require('../middleware/AuthMiddleware')

router.get('/', async (req, res) => {
    const data = await Categorias.findAll()
    res.json(data)
})

router.post('/', valideToken, async (req, res) => {
    const data = req.body
    await Categorias.create(data)
    res.json(data)
})


module.exports = router
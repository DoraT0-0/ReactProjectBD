const express = require('express')
const router = express.Router()
const {Products, sequelize} = require('../models')
const {valideToken} = require('../middleware/AuthMiddleware')

router.get('/', async (req, res) => {
    const data = await Products.findAll()
    res.json(data)
})

router.get('/ById/:id', async (req, res) => {
    const id = req.params.id
    const data = await Products.findByPk(id)
    res.json(data)
})

router.post('/', valideToken, async (req, res) => {
    const data = req.body
    await Products.create(data)
    res.json(data)
})

router.get('/report1', async (req, res) => {
    sequelize.query("SELECT id, name, quantity, price, (quantity * price) as sum FROM products").then((data) => {
        return res.json(data[0])
    })
})


module.exports = router
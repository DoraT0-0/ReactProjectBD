const express = require('express')
const router = express.Router()
const {Provider, sequelize} = require('../models')
const {valideToken} = require('../middleware/AuthMiddleware')

router.get('/', async (req, res) => {
    const data = await Provider.findAll()
    res.json(data)
})

router.get('/name', async (req, res) => {
    const data = await Provider.findAll({
        attributes: [
            'name'
        ]
    })
    res.json(data)
})

router.post('/', valideToken, async (req, res) => {
    const data = req.body
    await Provider.create(data)
    res.json(data)
})

router.get('/report3', async (req, res) => {
    sequelize.query("SELECT id, name, adress, phone, email FROM providers").then((data) => {
        return res.json(data[0])
    })
})

router.get('/ById/:id', async (req, res) => {
    const id = req.params.id
    const data = await Provider.findByPk(id)
    res.json(data)
})

module.exports = router
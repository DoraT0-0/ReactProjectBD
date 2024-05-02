const express = require('express')
const router = express.Router()
const {Cart, sequelize} = require('../models')
const {valideToken} = require('../middleware/AuthMiddleware')

router.get('/', async (req, res) => {
    const data = await Cart.findAll()
    res.json(data)
})

router.get('/counts/:idC', async (req, res) => {
    const idC = req.params.idC
    sequelize.query(`SELECT ProductId, count FROM sportproductdb.carts Where ClientId = ${idC}`).then((data) => {
        return res.json(data[0])
    })
})

router.get('/:idC', async (req, res) => {
    const idC = req.params.idC
    sequelize.query(`SELECT sportproductdb.products.*, sportproductdb.carts.count 
    FROM sportproductdb.products 
    LEFT JOIN sportproductdb.carts ON sportproductdb.products.id = sportproductdb.carts.ProductId 
    WHERE sportproductdb.carts.ClientId = ${idC}`)
    .then((data) => {
        return res.json(data[0])
    })
})

router.get('/count/:idC/:idP',valideToken, async (req, res) => {
    const idC = req.params.idC
    const idP = req.params.idP
    sequelize.query(`SELECT count FROM sportproductdb.carts where ClientId = ${idC} and ProductId = ${idP}`).then((data) => {
        return res.json(data[0])
    })
})

router.post('/',valideToken, async (req, res) => {
    const data = req.body
    await Cart.create(data)
    res.json(data)
})

router.post(`/countupdate`,valideToken, async (req, res) => {
    const data = req.body

    if(!data.remove){
    await Cart.update({
        count: data.count + 1
    },{
        where: {
            ClientId: data.idC,
            ProductId: data.idP
        }
    })
    res.json(data)
    }
    else{
        await Cart.update({
            count: data.count - 1
        },{
            where: {
                ClientId: data.idC,
                ProductId: data.idP
            }
        })
        res.json(data)
    }
})

router.delete('/removefromcart/:idC/:idP', async (req, res) => {
    const idC = req.params.idC
    const idP = req.params.idP
    sequelize.query(`DELETE FROM sportproductdb.carts WHERE ClientId = ${idC} AND ProductId = ${idP}`).then((data) => {
        return res.json(data[0])
    })
})

module.exports = router
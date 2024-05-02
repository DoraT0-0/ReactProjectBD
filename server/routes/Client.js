const express = require('express')
const router = express.Router()
const {Client} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {valideToken} = require('../middleware/AuthMiddleware')

router.post('/', async (req, res) => {
    const {email, password, phone, adress, admin} = req.body
    bcrypt.hash(password, 10).then( (hash) => {
        Client.create({
            email: email,
            password: hash,
            phone: phone,
            adress: adress,
            admin: admin
        })
        res.json("SUCCESS")
    })
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const client = await Client.findOne({where: {email: email}})
    if (!client) res.json({error: "Пользователя не существует"})
    else{
        bcrypt.compare(password, client.password).then((math) => {
            if (!math) res.json({error: "Не верный пароль"})
            else{
                const token = sign({email: client.email, id: client.id, admin: client.admin}, 'secret')
                res.json({token: token, email: email, id: client.id, admin: client.admin})
            }
            
        })
    }
})



router.get('/report2', async (req, res) => {
    const data = await Client.findAll({
        attributes: [
            'id',
            'email',
            'phone',
            'adress',
            'createdAt'
        ]
    })
    res.json(data)
})

router.get('/auth', valideToken, (req, res)=> {
    res.json(req.email)
})

module.exports = router
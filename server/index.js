const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require("./models")

// Routers
const productRouter = require('./routes/Products')
app.use('/products', productRouter)

const categoriasRouter = require('./routes/Categorias')
app.use('/categorias', categoriasRouter)

const clientRouter = require('./routes/Client')
app.use('/auth', clientRouter)

const providerRouter = require('./routes/Provider')
app.use('/provider', providerRouter)

const cartRouter = require('./routes/Cart')
app.use('/cart', cartRouter)


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001")
    })
})

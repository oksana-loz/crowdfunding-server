require('dotenv').config()
const express = require("express")
const sequelize = require('./db')

const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const authMiddleware = require('./middleware/authMiddleware')

const PORT = process.env.PORT || 3030

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(express.static('public'))

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server working on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()
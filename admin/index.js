require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()


app.use(express.json())
app.use(require('cors')())
app.use(require('./routes/users.route'))
app.use(require('./routes/todos.route'))
mongoose.connect(process.env.MONGO_SERVER)
    .then(()=>console.log('Успешное соединение'))
    .catch((()=>console.log('Ошибка')))
app.listen(process.env.PORT, () => {
  console.log(`Connected...`);
})
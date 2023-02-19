const Todo = require('../models/Todo.model')
const jwt = require('jsonwebtoken')

module.exports.todosController = {
    getAllTodo: async (req, res) => {
      const todos = await Todo.find();
      res.json(todos)
    },

    deleteTodos: async (req, res) => {
        const { id } = req.params
        //
        // Проверка
        // // берем токен из Header
        // const { authorization } = req.headers
        //
        // if (!authorization) {
        //     //
        // }
        // // проверяем прислал ли нам токен и правильно ли тип этого токена
        // const [type, token] =  authorization.split(' ')
        // // если все верно мы переходим к самому такену
        // if (type !== 'Bearer') {
        //     return res.status(401).json('Неверный тип токена')
        // }

        try {
            // в блоке try  с помощью jwt.verify мы дошефруем токен используя наш секретный ключ.
            // и смотрим тот ли этот токен который мы отправляли

            // const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

            // если все верно в переменной пайлоад будут наши данные который мы зашифровали

            const todo = await Todo.findById(id)

            if(todo.user.toString() === req.user.id) {
                await todo.remove()

                return res.json('Удалено')
            }
            return  res.status(401).json({error: 'Ошибка. Нет доступа'})
        } catch (e) {
            return  res.status(401).json({error: 'Ошибка' + e.toString()})
        }
    },
    createTodo: async (req, res) => {
        const { text} = req.body

        // берем токен из Header


        try {

            // в блоке try  с помощью jwt.verify мы дошефруем токен используя наш секретный ключ.
            // и смотрим тот ли этот токен который мы отправляли

            // если все верно в переменной пайлоад будут наши данные который мы зашифровали
            const todo = await Todo.create({
                user:  req.user.id,
                text
            })
            res.json(todo)

        } catch (e) {
            return  res.status(401).json({error: 'Неверный токен'})
        }
    }
}
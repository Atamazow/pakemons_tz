const Todo = require('../models/Todo.model')


module.exports.todosController = {
    getAllTodo: async (req, res) => {
      const todos = await Todo.find();
      res.json(todos)
    },
    deleteTodos: async (req, res) => {
        const { id } = req.params
        try {
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
        try {
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
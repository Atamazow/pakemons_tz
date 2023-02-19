const jwt = require("jsonwebtoken");
const Todo = require("../Todo.model");

module.exports = async (req, res, next) => {

    // берем токен из Header
    const {authorization} = req.headers

    if (!authorization) {
        res.status(401).json({error: 'Нет доступа (no authorization header)'})
    }
    // проверяем прислал ли нам токен и правильно ли тип этого токена
    const [type, token] =  authorization.split(' ')
    // если все верно мы переходим к самому такену
    if (type !== 'Bearer') {
        return res.status(401).json({error:'Неверный тип токена'})
    }

    try {

        // в блоке try  с помощью jwt.verify мы дошефруем токен используя наш секретный ключ.
        // и смотрим тот ли этот токен который мы отправляли
        req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY)

        // если все верно в переменной пайлоад будут наши данные который мы зашифровали
        next()
    } catch (e) {
        return  res.status(401).json({error: 'Неверный тип токена'})
    }
}

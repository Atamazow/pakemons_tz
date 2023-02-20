const User = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },

  registerUser: async (req, res) => {
   try {
     const { login, password } = req.body;

     const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

     const user = await User.create({ login: login, password: hash });
     res.json(user);
   } catch (e) {
     return res.status(401).json({
       error: "Ошибка при регистрации" + e.toString()
     })
   }
  },
  login: async (req, res) => {

    const { login, password } = req.body;

    //  сначала мы проверяем есть такой логин
    const candidate = await User.findOne({ login });

    if (!candidate) {
      return res.status(401).json({error: "Неверный логин"});
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({error: "Неверный пароль"});
    }
    const payload = {
      id: candidate._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "240h",
    });
    res.json({
      token,
    });
  },
};



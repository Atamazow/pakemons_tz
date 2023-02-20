const { todosController: todosRoute } = require("../controllers/todos.controller");
const { Router } = require("express");
const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware')

const router = Router();

router.get("/todos", todosRoute.getAllTodo);
router.post("/todos",authMiddleware, todosRoute.createTodo);
router.delete("/todos/:id",authMiddleware, todosRoute.deleteTodos)

module.exports = router;

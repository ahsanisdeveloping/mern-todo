import express from 'express';
import {insertTodo,getTodos, deleteTodo, updateTodo} from '../controllers/todoController.js'
const router = express.Router();


router.post('/inserttodo', insertTodo);
router.get('/gettodos/:user_id', getTodos);
router.delete('/deletetodo/:id', deleteTodo);
router.put('/updatetodo/:id', updateTodo);

export default router;
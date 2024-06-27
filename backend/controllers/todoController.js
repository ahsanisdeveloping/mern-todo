
import getTodoModel from "../models/todos.model.js";
import mongoose from "mongoose";
export const insertTodo = async (req, res) => {
  const {item,status,user_id} = req.body;
  const Todo = getTodoModel();
  try {
    const todo = await Todo.create({ item,status,user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTodos = async (req, res, next) => {
  const { user_id } = req.params;
    const Todo = getTodoModel();
  try {
    const todos = await Todo.find({ user_id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllTodos = async (req, res, next) => {
  const Todo = getTodoModel();
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteTodo = async (req, res) => {
  const Todo = getTodoModel();
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "item not found!" });
  }
  const todo = await Todo.findOneAndDelete({ _id: id });
  if (!todo) {
    res.status(404).json({ error: "Item not Deleted!" });
  }
  res.status(200).json(todo);
};

// export const updateTodo = async (req, res) => {
//   const Todo = getTodoModel();
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "item not found!" });
//   }
//   const todo = await Todo.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     }
//   );
//   if (!todo) {
//     return res.status(400).json({ error: "Item not found!" });
//   }
//   res.status(200).json(todo);
// };
export const updateTodo = async (req, res) => {
  const Todo = getTodoModel();
  const { id } = req.params;
  const { status } = req.body; // assuming the body contains the attribute to update

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found!" });
  }

  try {
    let todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Item not found!" });
    }

    // Update the specific attribute
    todo.status = status; // replace attributeName with the actual attribute you want to update

    // Save the updated document back to the database
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

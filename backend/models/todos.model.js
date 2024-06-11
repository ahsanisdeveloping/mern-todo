import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  item: String,
  status: String,
});

const getTodoModel = () => {
  return mongoose.model('Todo', todoSchema);
};

export default getTodoModel;
import { Typography, Box, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const AddItem = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser._id;
    const navigate = useNavigate();
  const [todo, setTodo] = useState({
    item: "",
    status: "pending",
    user_id:user_id
  });
  const handleItemText = (e) => {
    const tempItem = { ...todo, item: e.target.value };
    setTodo(tempItem);
  };
  const handleTodoAdd = async () => {
    const response = await fetch("http://localhost:3001/api/todo/inserttodo/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.error("there was an error in submitting the item");
    }
    if (response.ok) {
      navigate('/');
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <Card
        elevation={5}
        sx={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Item
        </Typography>
        <TextField
          onChange={handleItemText}
          id="outlined-basic"
          label="Item"
          variant="outlined"
        />
        <Button
          sx={{ marginTop: "5px" }}
          variant="contained"
          onClick={handleTodoAdd}
        >
          Add
        </Button>
      </Card>
    </Box>
  );
};

export default AddItem;

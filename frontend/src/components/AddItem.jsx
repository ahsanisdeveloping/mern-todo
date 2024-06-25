import { Typography, Box, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const AddItem = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser._id;
    const navigate = useNavigate();
    const [assignId,setAssignId] = useState("");
  // const [todo, setTodo] = useState({
  //   item: "",
  //   status: "pending",
  //   user_id:user_id
  // });
  const [item,setItem] = useState("");
  const handleItemText = (e) => {
    setItem(e.target.value);
  };
  const handleTodoAdd = async () => {
    const todoSend = {
      item:item,
      status:"pending",
      user_id:user_id
    }
    const response = await fetch("http://localhost:3001/api/todo/inserttodo/", {
      method: "POST",
      body: JSON.stringify(todoSend),
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
  const handleTaskAssign = async () => {
    const taskAssign = {
      item:item,
      status:"pending",
      user_id:assignId
    }
    const response = await fetch("http://localhost:3001/api/todo/inserttodo/", {
      method: "POST",
      body: JSON.stringify(taskAssign),
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
  }
  if(currentUser.role==='User'){
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
  }
  else if(currentUser.role==="Admin"){
    return(
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
          
        <Typography variant="h4" textAlign="center">Admin Access</Typography>
          <Typography variant="h6" gutterBottom>
            Assign Task
          </Typography>
          <TextField
            onChange={handleItemText}
            id="outlined-basic"
            label="Item"
            variant="outlined"
          />
          <TextField
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "100%",
            }}
            onChange={(e)=>{setAssignId(e.target.value)}}
            id="outlined-basic"
            label="To (user_id)"
            variant="outlined"
          />
          <Button
            sx={{ marginTop: "5px" }}
            variant="contained"
            onClick={handleTaskAssign}
          >
            Assign
          </Button>
        </Card>
      </Box>
    );
  }
  
};

export default AddItem;

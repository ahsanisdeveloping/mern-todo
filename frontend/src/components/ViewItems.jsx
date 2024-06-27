import { Typography, Box, Card, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootCard from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "bootstrap/dist/css/bootstrap.min.css";

const ViewItems = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser._id;
  const [itemsArray, setItemsArray] = useState([]);
  useEffect(() => {
    if(currentUser.role==="Admin"){
      fetch("http://localhost:3001/api/todo/getalltodos/")
      .then((res) => res.json())
      .then((data) => {
        setItemsArray(data);
      });
    }
    else{
      fetch("http://localhost:3001/api/todo/gettodos/"+user_id)
      .then((res) => res.json())
      .then((data) => {
        setItemsArray(data);
      });
    }
    
  }, []);
  
  return (
    <Box>
      <div style={{display:"flex",flexWrap:"nowrap"}}>
      <BootCard style={{ width: '30rem' }}>
      <BootCard.Header style={{fontWeight:"700"}}>Pending</BootCard.Header>
      <ListGroup variant="flush">
      {
        itemsArray.length>0 && itemsArray.map((item) => {
          if (item.status === "pending") {
            return (
              <ListGroup.Item key={item._id} draggable>
                {item.item}
              </ListGroup.Item>
            );
          }
        })
      }   
      </ListGroup>
    </BootCard>
    <BootCard style={{ width: '30rem' }}>
      <BootCard.Header style={{fontWeight:"700"}}>Required Approval</BootCard.Header>
      <ListGroup variant="flush">
      {
        itemsArray.length>0 && itemsArray.map((item) => {
          if (item.status === "required approval") {
            return (
              <ListGroup.Item key={item._id}>
                {item.item}
              </ListGroup.Item>
            );
          }
        })
      }   
      </ListGroup>
    </BootCard>
    <BootCard style={{ width: '30rem' }}>
      <BootCard.Header style={{fontWeight:"700"}}>Completed</BootCard.Header>
      <ListGroup variant="flush">
      {
        itemsArray.length>0 && itemsArray.map((item) => {
          if (item.status === "completed") {
            return (
              <ListGroup.Item key={item._id}>
                {item.item}
              </ListGroup.Item>
            );
          }
        })
      } 
      </ListGroup>
    </BootCard>
    </div>
    </Box>
  );
};

export default ViewItems;

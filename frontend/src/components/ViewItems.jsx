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
import BootCard from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const ViewItems = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser._id;
  const [itemsArray, setItemsArray] = useState([]);
  const [flag,setFlag] = useState(0);
  useEffect(() => {
    if (currentUser.role === "Admin") {
      fetch("http://localhost:3001/api/todo/getalltodos/")
        .then((res) => res.json())
        .then((data) => {
          setItemsArray(data);
        });
    } else {
      fetch("http://localhost:3001/api/todo/gettodos/" + user_id)
        .then((res) => res.json())
        .then((data) => {
          setItemsArray(data);
        });
    }
  }, [flag]);
  const onDragEnd = async (result) => {
    // console.log(result);
    const { draggableId, source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    if (destination.droppableId == "pendingTasks") {
      console.log("change status to pending");
      const response = await fetch("http://localhost:3001/api/todo/updatetodo/" + draggableId, {
        method: "PUT",
        body: JSON.stringify({
              status:"pending",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      if (response.ok) {
          // window.location.reload(true);
          setFlag(prev=>prev+1)
      } else {
        alert("there was an error updating");
      }
    }
    if (destination.droppableId == "requiredApproval") {
      console.log("change status to requiredApproval");
      const response = await fetch("http://localhost:3001/api/todo/updatetodo/" + draggableId, {
        method: "PUT",
        body: JSON.stringify({
              status:"required approval",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      if (response.ok) {
          // window.location.reload(true);
          setFlag(prev=>prev+1)
      } else {
        alert("there was an error updating");
      }
    }
    if (destination.droppableId == "completedTasks") {
      console.log("change status to completed");
      const response = await fetch("http://localhost:3001/api/todo/updatetodo/" + draggableId, {
        method: "PUT",
        body: JSON.stringify({
              status:"completed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      if (response.ok) {
          // window.location.reload(true);
          setFlag(prev=>prev+1)
      } else {
        alert("there was an error updating");
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Droppable droppableId="pendingTasks">
            {(provided) => (
              <BootCard
                style={{ width: "30rem" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <BootCard.Header style={{ fontWeight: "700" }}>
                  Pending
                </BootCard.Header>
                <ListGroup variant="flush">
                  {itemsArray.length > 0 &&
                    itemsArray.map((item, index) => {
                      if (item.status === "pending") {
                        return (
                          <Draggable draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
                                key={item._id}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {item.item}
                              </ListGroup.Item>
                            )}
                          </Draggable>
                        );
                      }
                    })}
                </ListGroup>
                {provided.placeholder}
              </BootCard>
            )}
          </Droppable>
          <Droppable droppableId="requiredApproval">
            {(provided) => (
              <BootCard
                style={{ width: "30rem" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <BootCard.Header style={{ fontWeight: "700" }}>
                  Required Approval
                </BootCard.Header>
                <ListGroup variant="flush">
                  {itemsArray.length > 0 &&
                    itemsArray.map((item, index) => {
                      if (item.status === "required approval") {
                        return (
                          <Draggable draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
                                key={item._id}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {item.item}
                              </ListGroup.Item>
                            )}
                          </Draggable>
                        );
                      }
                    })}
                </ListGroup>
                {provided.placeholder}
              </BootCard>
            )}
          </Droppable>
          <Droppable droppableId="completedTasks">
            {(provided) => (
              <BootCard
                style={{ width: "30rem" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <BootCard.Header style={{ fontWeight: "700" }}>
                  Completed
                </BootCard.Header>
                <ListGroup variant="flush">
                  {itemsArray.length > 0 &&
                    itemsArray.map((item, index) => {
                      if (item.status === "completed") {
                        return (
                          <Draggable draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
                                key={item._id}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {item.item}
                              </ListGroup.Item>
                            )}
                          </Draggable>
                        );
                      }
                    })}
                </ListGroup>
                {provided.placeholder}
              </BootCard>
            )}
          </Droppable>
        </div>
      </Box>
    </DragDropContext>
  );
};

export default ViewItems;

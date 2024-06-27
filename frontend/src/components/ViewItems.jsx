import { Typography, Box, Card, TextField, Button, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(0);

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
    const { draggableId, source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    setLoading(true);

    let newStatus = "";

    if (destination.droppableId === "pendingTasks") {
      newStatus = "pending";
    } else if (destination.droppableId === "requiredApproval") {
      newStatus = "required approval";
    } else if (destination.droppableId === "completedTasks") {
      newStatus = "completed";
    }

    try {
      const response = await fetch("http://localhost:3001/api/todo/updatetodo/" + draggableId, {
        method: "PUT",
        body: JSON.stringify({
          status: newStatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFlag((prev) => prev + 1);
      } else {
        alert("There was an error updating");
      }
    } catch (error) {
      console.error(error);
      alert("There was an error updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        {loading?
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>: <div style={{ display: "flex", flexWrap: "nowrap", }}>
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
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
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
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
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
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided) => (
                              <ListGroup.Item
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
        }
      </Box>
    </DragDropContext>
  );
};

export default ViewItems;

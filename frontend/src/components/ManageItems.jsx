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
const ManageItems = () => {
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
    const handleDelete = async (id) => {
      console.log(id);
      const response = await fetch("http://localhost:3001/api/todo/deletetodo/" + id, {
        method: "DELETE",
      });
      const jsonResponse = await response.json();
      if (response.ok) {
          window.location.reload(true);
      } else {
        alert("there was an error deleting");
      }
    };
    const handleUpdate = async (id,item) => {
      const response = await fetch("http://localhost:3001/api/todo/updatetodo/" + id, {
        method: "PUT",
        body: JSON.stringify({
              item:item,
              status:"completed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      if (response.ok) {
          window.location.reload(true);
      } else {
        alert("there was an error updating");
      }
    };
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell
                
                  sx={{ fontSize: "2rem", color: "white" }}
                  align="center"
                >
                  Item
                </TableCell>
                <TableCell
                  sx={{ fontSize: "2rem", color: "white" }}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontSize: "2rem", color: "white" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsArray.length>0?itemsArray.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {item.item}
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: 1 }}
                      onClick={()=>{handleUpdate(item._id,item.item)}}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )):<Typography sx={{padding:3}}>Add Items to Display here!</Typography>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
}
 
export default ManageItems;
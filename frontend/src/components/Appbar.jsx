// import { Button } from "@mui/material";
// import "../styles/appbar.css";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { signout } from "../redux/authReducer/authSlice";
// const Appbar = () => {
//   const dispatch = useDispatch();
//   const handleSignOut = async () => {
//     await fetch("http://localhost:3001/api/auth/signout/", { method: "POST" })
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch(signout());
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div
//       className="appbar"
//       // style={
//       //   {
//       //     display: 'flex',
//       //     justifyContent:'space-evenly',
//       //     alignItems: 'center',
//       //     padding: '10px',
//       //     backgroundColor: 'white',
//       //     color: 'white',
//       //     width: '100%',
//       //     boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
//       //   }
//       // }
//     >
//       <Link className="appbar-links" to="/">
//         View Items
//       </Link>
//       <Link className="appbar-links" to="additem">
//         Add Item
//       </Link>
//       <Button onClick={handleSignOut} variant="contained" color="error">
//         Sign Out
//       </Button>
//     </div>
//   );
// };

// export default Appbar;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { signout } from "../redux/authReducer/authSlice";
import { useDispatch } from "react-redux";
import { BorderBottom } from "@mui/icons-material";
function Appbar() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
        await fetch("http://localhost:3001/api/auth/signout/", { method: "POST" })
          .then((res) => res.json())
          .then((data) => {
            dispatch(signout());
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <div style={{padding:"0px 20px",display:"flex",width:"100%"}}>
          <Navbar.Brand style={{fontWeight:500}} >Task Pilot</Navbar.Brand>
          <Nav className="me-auto" style={{display:'flex',justifyContent:"space-between",width:"100%",alignItems:"center"}}>
            <div style={{display:"flex"}}>
              <Nav.Link>
              <Link className="appbar-links" to="/" style={{textDecoration:"none",color:"#656866",}}>
                Board
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="appbar-links" to="additem" style={{textDecoration:"none",color:"#656866"}}>
                Add Task
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="appbar-links" to="/manageitems" style={{textDecoration:"none",color:"#656866"}}>
                Manage Tasks
              </Link>
            </Nav.Link>
            
            </div>
            <div>
            <Button variant="outline-danger" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
            
          </Nav>
        </div>
      </Navbar>
    </>
  );
}

export default Appbar;

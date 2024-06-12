import { Box, Typography } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import { useState } from "react";
import RegisterForm from "../forms/RegisterForm";

const Auth = () => {
    const [toggleFlag,setToggleFlag] = useState(true)
    const invertToggleFlag = ()=>{
        setToggleFlag(!toggleFlag)
    }
    return ( 
        <Box>
            <Typography textAlign={"center"} color="primary" variant="h2" sx={{padding:"10px"}}>MERN-TODO-APP</Typography>
            {toggleFlag?<LoginForm invertToggleFlag={invertToggleFlag}/>:<RegisterForm invertToggleFlag={invertToggleFlag}/>}
        </Box>

     );
}
 
export default Auth;
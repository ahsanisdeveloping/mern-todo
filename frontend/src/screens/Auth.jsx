import { Box, Typography } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { useState } from "react";

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
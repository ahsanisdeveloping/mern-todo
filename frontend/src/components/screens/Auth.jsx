import { Box } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import { useState } from "react";
import RegisterFrom from "../forms/RegisterForm";

const Auth = () => {
    const [toggleFlag,setToggleFlag] = useState(true)
    const invertToggleFlag = ()=>{
        setToggleFlag(!toggleFlag)
    }
    return ( 
        <Box>
            {toggleFlag?<LoginForm invertToggleFlag={invertToggleFlag}/>:<RegisterFrom invertToggleFlag={invertToggleFlag}/>}
        </Box>

     );
}
 
export default Auth;
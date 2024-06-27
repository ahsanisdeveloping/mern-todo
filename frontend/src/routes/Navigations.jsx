import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "../components/Appbar";
import ViewItems from "../components/ViewItems";
import AddItem from "../components/AddItem";
import { useSelector } from "react-redux";
import Auth from "../screens/Auth";
import ManageItems from "../components/ManageItems";
const Navigations = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return ( 
        <>
        <BrowserRouter>
        {currentUser?<>
            <Appbar/>
        <Routes>
            <Route path="/" element={<ViewItems/>} />
            <Route path="/additem" element={<AddItem/>} />
            <Route path="/manageitems" element={<ManageItems/>} />
        </Routes>
        </>:<Auth/>}
           
        </BrowserRouter>
        </>
     );
}
 
export default Navigations;
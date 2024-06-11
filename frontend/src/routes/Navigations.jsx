import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "../components/Appbar";
import ViewItems from "../components/ViewItems";
import AddItem from "../components/AddItem";
const Navigations = () => {
    return ( 
        <>
        <BrowserRouter>
            <Appbar/>
        <Routes>
            <Route path="/" element={<ViewItems/>} />
            <Route path="/additem" element={<AddItem/>} />
        </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Navigations;
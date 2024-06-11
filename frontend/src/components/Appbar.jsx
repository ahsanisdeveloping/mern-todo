import '../styles/appbar.css'

import { Link } from "react-router-dom";

const Appbar = () => {
  return ( 
    <div className="appbar" 
    // style={
    //   {
    //     display: 'flex',
    //     justifyContent:'space-evenly',
    //     alignItems: 'center',
    //     padding: '10px',
    //     backgroundColor: 'white',
    //     color: 'white',
    //     width: '100%',
    //     boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    //   }
    // }
    >
      <Link className='appbar-links' to='/'>View Items</Link>
      <Link className='appbar-links' to='additem'>Add Item</Link>
    </div>
   );
}
 
export default Appbar;
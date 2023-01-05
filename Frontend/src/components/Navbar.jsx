import {Link} from 'react-router-dom'
import AddHomeIcon from '@mui/icons-material/AddHome';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';

const Navbar = () => {
    return ( 
    <div className="navbar-container"  >
        <Link to="/"> <HomeIcon/>  Home</Link>
        <Link to="/create" ><AddHomeIcon/> New Rent</Link>
        <Link to="/saved"><OtherHousesIcon/> Saved Rent</Link> 
        {/* <Link to="/calculator"><CalculateIcon/> Calculator</Link> */}
        {/* <a href="">Area Calculator</a>
        <a href="">Saved properties</a> */}
       
    </div>
     );
}
 
export default Navbar;
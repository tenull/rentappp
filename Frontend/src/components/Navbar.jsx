import {Link} from 'react-router-dom'

const Navbar = () => {
    return ( 
    <div className="navbar-container"  >
        <Link to="/">Home</Link>
        <Link to="/calculator">Calculator</Link>
        {/* <a href="">Area Calculator</a>
        <a href="">Saved properties</a> */}
        <Link to="/create" >New Rent</Link>
        <Link to="/saved">Saved Rent</Link>
    </div>
     );
}
 
export default Navbar;
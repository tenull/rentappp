import HouseList from "./components/HouseList";
import Renthouse from "./components/Renthouse";
import useFetch from "./useFetch";
import LoadingMask from "./components/LoadingMask";


const Home = () => {
   
    const {data:houses, isPending, error} = useFetch('http://localhost:8000/houses');
    
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <LoadingMask/> }
          {houses && <HouseList houses={houses} title="Hello" />}
       
        </div>
     );
  }
 
export default Home;
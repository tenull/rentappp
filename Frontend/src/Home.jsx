import HouseList from "./components/HouseList";
import Renthouse from "./components/Renthouse";
import useFetch from "./useFetch";
import LoadingMask from "./components/LoadingMask";


const Home = () => {
   
    const {data:houses, isPending, error} = useFetch('http://localhost:8000/houses');

//    const handleDelete = (id) => {
//         const newBlogs = houses.filter(house => house.id !== id);
//         setBlogs(newBlogs);

//    }


    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <LoadingMask/> }
          {houses && <HouseList houses={houses} title="Hello"/*  handleDelete={handleDelete} */ />}
           {/* <BlogList blogs={blogs.filter((blog)=>blog.author ==='mario')} title="'Mario's blogs"/> */}
           {/* <button onClick={()=> setName('luigi')}>Change name</button>
           <p>{name}</p> */}
       
        </div>
     );
  }
 
export default Home;
import HouseList from "./HouseList";
import useFetch from "../useFetch";
import { useHistory, useParams } from "react-router-dom";

const Renthouse = () => {
    const { id } = useParams();
    const{data:house} = useFetch('http://localhost:8000/houses/' + id)
    const history = useHistory()

    const handleDelete = () => {
      fetch("http://localhost:8000/houses/" + house.id, {
        method: "DELETE",
      }).then(() => {
        history.push("/");
      });
    };
    

    return ( 
        <div className="renthouse-container">
 
            {house && (
                <article>
                   <h2>{house.name}</h2>
              <img src={house.picture} alt="" />
              <h2>{house.squaremeter}m2</h2>
              <h2>{house.grossrent}€</h2>
              <button onClick={handleDelete}>delete</button>
                </article>
            )}
            
        </div>
     );
}
 
export default Renthouse;
import HouseList from "./HouseList";
import { useState } from "react";

const SavedRents = ({houses,findfavorite,removeFavorite,favorite}) => {

    // const [favorite,setFavorite]=useState([])

    // let findfavorite = houses.filter(house => favorite.includes(house.id));
   
   
    return ( 
       
        <div className="favorite__list">
          <h2>Saved rents</h2>
          {favorite && findfavorite.map(house => {
            return (
              <div key={house.id} className="recipe__card">
                <h2>{house.name}</h2>
                <img src={`http://localhost:8000${house.picture}`} alt="" />
                <h2>{house.squaremeter}m2</h2>
                <h2>{house.grossrent}€</h2>
                <button onClick={() => removeFavorite(house.id)}>
                 Remove
                </button>
              </div>
            );
          })}
        </div>
     
 

     );
}
 
export default SavedRents;
import React from "react";


const Popup = (props,favorite,findfavorite,removeFavorite,house) => {
    return ( props.trigger) ? (
<div className="popup">
    <div className="popup-inner">
    <button className="close-btn" onClick={()=>props.setTrigger(false)}>&times;</button>
        
    <div className="favorite__list">
          <h2>Saved rentsss</h2>
          {favorite && findfavorite?.map(house => {
            return (
              <div key={house.id} className="recipe__card">
                <h2>{house.name}</h2>
                {console.log(house.name)}
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
     


        </div>
</div>

     ): "";
}

 
export default Popup;
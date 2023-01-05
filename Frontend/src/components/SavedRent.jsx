import { useState, useEffect } from "react";

const SavedRents = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem("favorites"));

    if (localFavorites) {
      setFavorites(localFavorites);
    }
  }, []);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((house) => house.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="saved-rents">
      <h1>Saved rents</h1>
    <div className="rents">
      
      {favorites &&
        favorites.map((house) => {
          return (
            <div key={house.id} className="houses-box-favorite">
              <h2>{house.name}</h2>
              <img src={`http://localhost:8000${house.picture}`} alt="" />
              <h2>{house.squaremeter}m2</h2>
              <h2>{house.grossrent}€</h2>
              <button onClick={() => removeFavorite(house.id)}>Remove</button>
            </div>
          );
        })}
    </div>
    </div>
  );
};

export default SavedRents;
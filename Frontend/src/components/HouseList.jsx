import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HotTubIcon from "@mui/icons-material/HotTub";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  maxHeight: 800,
  overflowY: "auto",
  bgcolor: "#242d38",
  color: "#efd592",
  border: "2px solid #efd592",
  boxShadow: 24,
  p: 4,
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#efd592",
    outline: "1px solid slategrey",
  },
};

const HouseList = ({ houses }) => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMax, setSearchMax] = useState("");
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [actualData, setActualData] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [bed, setBed] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [open, setOpen] = React.useState(false);
  const [numberOfHouses, setNumberOfHouses] = useState(0);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites"));
    if (fav) {
      setFavorites(fav);
    }
  }, []);

  useEffect(() => {
    const houseBox = document.querySelectorAll(".houses-box");
    setNumberOfHouses(houseBox.length);
  }, [search, searchMax, bed, kitchen, bathroom]);

  const handleOpen = (house) => {
    setOpen(true);
    setActualData(house);
  };
  const handleClose = () => setOpen(false);

  const setSearchValue = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setSearch(Number(e.target.value));
    if (e.target.value === "") {
      setSearch("");
    }
  };

  const setSearchMaxValue = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setSearchMax(Number(e.target.value));
    if (e.target.value === "") {
      setSearchMax("");
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function deleteHouse(id) {
    fetch(`http://localhost:8000/houses/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        console.log(id);
        refreshPage();
      });
    });
  }

  const removeFavorite = (id) => {
    let newFavorites = favorites.filter((house) => house.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setActive(!active);
  };

  const addToFavorite = (id) => {
    let house = houses.find((house) => house.id === id);
    if (!favorites.includes(house)) {
      setFavorites([...favorites, house]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, house]));
    }
    setActive(!active);
  };

  return (
    <div className="main">
      <div className="main-box">
        <div className="searchfiled">
          <div className="rental">
            {" "}
            <div className="rental-number">{numberOfHouses}</div> available
            rentals{" "}
          </div>
          <div className="inputfilter">
            <p>Looking for the best price</p>
            <input
              type="number"
              placeholder="Min Price"
              value={search}
              onChange={(event) => setSearchValue(event)}
            />

            <input
              type="number"
              placeholder="Max Price"
              value={searchMax || ""}
              onChange={(event) => setSearchMaxValue(event)}
            />
          </div>
          <div
            onClick={() => {
              setMore(!more);
            }}
          >
            {more ? (
              <div className="showmore">
                {" "}
                <SearchIcon /> <p>Show Less</p>
              </div>
            ) : (
              <div className="showmore">
                {" "}
                <SearchIcon /> <p>More filters</p>
              </div>
            )}
          </div>

          {more && (
            <div className="searchbar">
              <div className="bed">
                <label htmlFor="bed">Number of beds:</label>
                <select
                  name="bed"
                  id="bed"
                  value={bed}
                  onChange={(event) => setBed(event.target.value)}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="kitchen">
                <label htmlFor="kitchen">Number of kitchens:</label>
                <select
                  name="kitchen"
                  id="kitchen"
                  value={kitchen}
                  onChange={(event) => setKitchen(event.target.value)}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="bathroom">
                <label htmlFor="bathroom">Number of bathroom:</label>
                <select
                  name="bathroom"
                  id="batroom"
                  value={bathroom}
                  onChange={(event) => setBathroom(event.target.value)}
                >
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="favorite-box">
          <button
            onClick={() => {
              setTrigger(!trigger);
            }}
          >
            <FavoriteIcon />
            {favorites.length === 0
              ? favorites.length === ""
              : favorites.length}
          </button>
        </div>
      </div>
      <div className="house-list">
        {houses &&
          houses
            .filter((result) => {
              if (search === "") {
                return result;
              } else if (search <= result.grossrent) {
                return result;
              }
            })
            .filter((result) => {
              if (searchMax === "") {
                return result;
              } else if (searchMax >= result.grossrent) {
                return result;
              }
            })
            .filter((result) => {
              if (bed === "") {
                return result;
              } else if (bed == result.bedroom) {
                return result;
              }
            })
            .filter((result) => {
              if (kitchen === "") {
                return result;
              } else if (kitchen == result.kitchen) {
                return result;
              }
            })
            .filter((result) => {
              if (bathroom === "") {
                return result;
              } else if (bathroom == result.bathroom) {
                return result;
              }
            })
            .map((house, idx) => (
              <div className="houses-box" key={idx}>
                <div
                  className="house-preview"
                  key={idx}
                  onClick={() => handleOpen(house)}
                >
                  <h2>{house.name}</h2>
                  <img src={`http://localhost:8000${house.picture}`} alt="" />
                  <h2>Area: {house.squaremeter}m2</h2>
                  <h2>Gross Rent:{house.grossrent}€</h2>
                </div>
                <div>
                  <button onClick={() => addToFavorite(house.id)}>Save</button>
                  <button onClick={() => deleteHouse(house.id)}>Delete</button>
                </div>
              </div>
            ))}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-header">
            <h1>{actualData.name}</h1>

            {active ? (
              <FavoriteIcon onClick={() => removeFavorite(actualData.id)} />
            ) : (
              <FavoriteBorderIcon
                onClick={() => addToFavorite(actualData.id)}
              />
            )}
            </div>
            <div className="modal-picture">
            <img src={`http://localhost:8000${actualData.picture}`} alt="" />
            </div>
            <div className="modal-icon">
            <h2>Area: {actualData.squaremeter}m2</h2>
            <h2>
              <BedIcon /> : {actualData.bedroom}
            </h2>
            <h2>
              <KitchenIcon /> : {actualData.kitchen}
            </h2>
            <h2>
              <HotTubIcon /> : {actualData.bathroom}
            </h2>
            </div>
            <h2>Gross Rent: {actualData.grossrent}€</h2>
            <h2>About the House: {actualData.text}</h2>
          </Box>
        </Modal>
      </div>

      <div className="house-list">
        {trigger && (
          <div className="popup-inner">
            <h2>Saved Rents</h2>
            <button
              className="close-btn"
              onClick={() => {
                setTrigger(!trigger);
              }}
            >
              &times;
            </button>
            {favorites.length > 0 ? (
              favorites.map((house) => {
                return (
                  <div key={house.id} className="houses-box-favorite">
                    <h2>{house.name}</h2>

                    <img src={`http://localhost:8000${house.picture}`} alt="" />
                    <h2>{house.squaremeter}m2</h2>
                    <h2>{house.grossrent}€</h2>
                    <button onClick={() => removeFavorite(house.id)}>
                      Remove
                    </button>
                  </div>
                );
              })
            ) : (
              <div>
                <h2>No saved Rents</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseList;

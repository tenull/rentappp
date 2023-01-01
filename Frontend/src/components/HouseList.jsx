import useFetch from "../useFetch";
import { useState } from "react";
import RangeSlider from "./GrossrentFilter";
import SavedRents from "./SavedRent";
import { useHistory, useParams } from "react-router-dom";
import RenthouseModal from "./RenthouseModal";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BedIcon from "@mui/icons-material/Bed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HotTubIcon from "@mui/icons-material/HotTub";
import SearchIcon from "@mui/icons-material/Search";
import BasicModal from "./RenthouseModal";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

const HouseList = ({ houses, BasicModal, props, }) => {
  // const { id } = useParams();
  // const { data} = useFetch('http://localhost:8000/houses/' + id);
  // const [name, setName] = useState('');
  // const [squaremeter, setSquareMeter] = useState('');
  // const [grossrent, setGrossrent] = useState('')
  const [isPending, setIsPending] = useState(false);
  // const [picture, setPicture] = useState('')
  const [favorite, setFavorite] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMax, setSearchMax] = useState("");
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [more, setMore] = useState(false);
  const [actualData, setActualData] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [trigger,setTrigger]= useState(false)

  // const openForm = () =>setTrigger(false)

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleOpen = (house) => {
    setOpen(true);
    setActualData(house);
  };
  const handleClose = () => setOpen(false);

  const setSearchValue = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setSearch(e.target.value);
  };

  const setSearchMaxValue = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setSearchMax(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const blog = house.name
  //   setIsPending(true)
  //   console.log(house)

  //   fetch('http://localhost:4000/houses', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(blog)
  //   }).then(() => {
  //     console.log(blog)
  //     setIsPending(false)

  //   })
  // }

  function deleteHouse(id) {
    fetch(`http://localhost:8000/houses/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        console.log(id);
      });
    });
  }

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8000/houses/${id}`);

  //   } catch (error) {
  //     console.error(error);
  //     console.log(id)
  //   }
  // };

  // const handleDelete = () => {
  //   fetch('http://localhost:8000/houses/' + houses.id, {
  //     method: 'DELETE',
  //   }).then(() => {
  //     history.push('/');
  //   })
  // }

  const removeFavorite = (id) => {
    let index = favorite.indexOf(id);
    // console.log(index);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
    setActive(!active);
  };

  let findfavorite = houses.filter((houses) => favorite.includes(houses.id));

  const addToFavorite = (id) => {
    if (!favorite.includes(houses.id)) setFavorite(favorite.concat(id));
    // console.log(id);
    setActive(!active);
  };
  const result = houses.length;
  const countFavorite =  favorite.length 

  return (
    <div className="main">
      <div className="circle"><button onClick={() => {
            setTrigger(!trigger);
          }}><FavoriteIcon/> {countFavorite === 0 ? countFavorite === '' : countFavorite}</button></div>
      <div className="searchfiled">
        <div className="rental">
          {" "}
          <div className="rental-number">{result}</div> available rentals{" "}
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
            value={searchMax}
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
              <SearchIcon /> <p>Show More</p>
            </div>
          )}
        </div>

        {more && (
          <div className="searchbar">
            <div className="area">
              <p>Area</p>
              <input
                type="number"
                placeholder="Area min"
                value={searchMax}
                onChange={(event) => setSearchMaxValue(event)}
              />
              <span>m2 </span>
              <span>x</span>
              <input
                type="number"
                placeholder="Area min"
                value={searchMax}
                onChange={(event) => setSearchMaxValue(event)}
              />
              <span>m2</span>
            </div>
            <div className="bed">
              <label for="bed">Number of beds:</label>
              <select name="bed" id="bed">
                <option value="0"></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="kitchen">
              <label for="kitchen">Number of kitchens:</label>
              <select name="kitchen" id="kitchen">
                <option value="0"></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* <RangeSlider /> */}
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
            .map((house, idx) => (
              <div className="houses-box">
              <div
                className="house-preview"
                key={idx}
                onClick={
                  () => handleOpen(house)
                  //  setOpenPopup(true)
                  // setAtcualData(house.house)
                  // console.log(setAtcualData)
                }
              >
                <h2>{house.name}</h2>

                {/* {active ?
              <FavoriteIcon onClick={() => removeFavorite(house.id)}/> :
              <FavoriteBorderIcon onClick={()=>addToFavorite(house.id)}/> } */}
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

        {/* {openPopup && (<BasicModal actualData={actualData} handleClose={handleClose} />
)} */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p>{actualData.name}</p>

            {active ? (
              <FavoriteIcon onClick={() => removeFavorite(actualData.id)} />
            ) : (
              <FavoriteBorderIcon
                onClick={() => addToFavorite(actualData.id)}
              />
            )}
            <img src={`http://localhost:8000${actualData.picture}`} alt="" />
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
            <h2>Gross Rent:{actualData.grossrent}€</h2>
            <h2>About the House: {actualData.text}</h2>
          </Box>
        </Modal>

        {/* {house && house.filter(result=> {
                 return result.grossrent ===  search
      }
      )} */}
      </div>
    
      <div className="house-list">
      
{    trigger &&   <div className="popup-inner">  
      <h2>Saved Rentss</h2>
    <button className="close-btn" onClick={() => {
            setTrigger(!trigger);
          }} >&times;</button> 
        {findfavorite.map((house) => {
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
         </div>}
    </div>
    </div>

  );
};

export default HouseList;
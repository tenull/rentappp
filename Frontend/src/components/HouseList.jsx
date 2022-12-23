import useFetch from "../useFetch";
import { useState } from "react";
import RangeSlider from "./GrossrentFilter";
import SavedRents from "./SavedRent";
import { useHistory,useParams } from "react-router-dom";
import RenthouseModal from "./RenthouseModal";
import { Link } from "react-router-dom";
import axios from 'axios';


const HouseList = ({ houses,handleOpen }) => {

  // const { id } = useParams();
  // const { data} = useFetch('http://localhost:8000/houses/' + id);
  // const [name, setName] = useState('');
  // const [squaremeter, setSquareMeter] = useState('');
  // const [grossrent, setGrossrent] = useState('')
  const [isPending, setIsPending] = useState(false);
  // const [picture, setPicture] = useState('')
  const [favorite, setFavorite] = useState([])
  const [search, setSearch] = useState("")
  const [searchMax, setSearchMax] = useState("")
  const history = useHistory()

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



function deleteUser(id){
fetch(`http://localhost:8000/houses/${id}`,{
  method:'DELETE'
}).then((result)=>{
  result.json().then((resp)=>{
console.warn(resp)
console.log(id)
  })
})
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

  const removeFavorite = id => {
    let index = favorite.indexOf(id);
    // console.log(index);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
  };


  let findfavorite = houses.filter(houses => favorite.includes(houses.id));
  
  const addToFavorite = id => {

    if (!favorite.includes(houses.id)) setFavorite(favorite.concat(id));
    // console.log(id);
  };
 

  return (

    <div className="main">
      <div className="inputfilter">
        <p>min</p>
        <input
          type="number"
          placeholder='Search'
          value={search}
          onChange={event => setSearch(event.target.value)} />
        <p>max</p>
        <input
          type="number"
          placeholder='Search'
          value={searchMax}
          onChange={event => setSearchMax(event.target.value)} />
      </div>
      
      <RangeSlider />
      <div className="house-list">

        {houses && houses.filter(result => {
          if (search === '') {
            return result
          } else if (search <= result.grossrent) {
            return result
          }

        }
        )
          .filter(result => {
            if (searchMax === '') {
              return result
            } else if (searchMax >= result.grossrent) {
              return result
            }

          }
          )
          .map((house,idx) => (
            <div className="house-preview" key={idx}  >
              
              <h2 >{house.name}</h2>
              
              <img src={`http://localhost:8000${house.picture}`} alt="" />
              <h2>Area: {house.squaremeter}m2</h2>
              <h2>Gross Rent:{house.grossrent}€</h2>
              <button onClick={()=>addToFavorite(house.id)}>Add to</button>
              <button onClick={()=>deleteUser(house.id)}>Delete</button>
              {/* <button onClick={()=>handleOpen}>Open Modal</button> */}

            </div>
          ))}


        {/* {house && house.filter(result=> {
                 return result.grossrent ===  search
      }
      )} */}
      </div>
<h2>Saved Rents</h2>
      <div className="house-list">
       
        {findfavorite.map(house => {
          return (
            
            <div key={house.id} className="house-preview">
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


    </div>
  );
}

export default HouseList;
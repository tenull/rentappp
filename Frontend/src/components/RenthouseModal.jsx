import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({houses,open, actualData,handleClose,active,FavoriteIcon,removeFavorite,FavoriteBorderIcon,addToFavorite,BedIcon,KitchenIcon,HotTubIcon}) {
console.log(actualData)


  return (
    <div>
     
  <div className="name">
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <p>{actualData.name}</p>
             
              {/* {active ?
              <FavoriteIcon onClick={() => removeFavorite(house.id)}/> :
              <FavoriteBorderIcon onClick={()=>addToFavorite(house.id)}/> }
               <img src={`http://localhost:8000${house.picture}`} alt="" />
              <h2>Area: {house.squaremeter}m2</h2>
              <h2><BedIcon/> : {house.bedroom}</h2>
              <h2><KitchenIcon/> : {house.kitchen}</h2>
              <h2><HotTubIcon/> : {house.bathroom}</h2>
              <h2>Gross Rent:{house.grossrent}€</h2>
              <h2>About the House: {house.text}</h2> */}
              
        </Box>
      </Modal>
      </div>
    </div>
  );
}
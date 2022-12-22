import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import HouseList from './HouseList';

function valuetext(value) {
  return `${value}€`;
}

export default function RangeSlider({houses,grossrent}) {
  const [value, setValue] = React.useState([500, 2500]);
  const [minimum,setMinimum]= React.useState("")
  const[maximum,setMaximum] = React.useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="slider">
        <p>GrossRent filter</p>
    <Box sx={{ width: 300 , color:"#efd592", justifyContent:"center"}}>
      <Slider 
      sx={{ color:"#efd592" }}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        
        min={500}
        max={2500}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
    </div>
  );
}
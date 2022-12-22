import { useState } from "react";


const Calculator = () => {
 const[inputValue,setInputValue] = useState(0)
 const [secInputValue,setSecInputValue] = useState(0)


    return ( 
        <div className="calculator-container">
            <p>Kitchen</p>
            <input type="number" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}  />
            <p>by</p>
            <input type="number" value={secInputValue} onChange={(e)=>{setSecInputValue(e.target.value)}} />
        {<p>{inputValue*secInputValue} m2</p>}
        </div>
     );
}
 
export default Calculator;
import React from "react";


const Popup = (props) => {
    return ( props.trigger) ? (
<div className="popup">
    <div className="popup-inner">
    <button className="close-btn" onClick={()=>props.setTrigger(false)}>&times;</button>
        <h1>LOGIN</h1>
        <div className="username">
 <p>USERNAME</p>
        <input type="text" name="" id="" />
        </div>
        <div className="password">
            <p>PASSWORD</p>
            <input type="password" />
        </div>
       <button className="loginning">LOGIN</button>
        
       
        </div>
</div>

     ): "";
}

 
export default Popup;
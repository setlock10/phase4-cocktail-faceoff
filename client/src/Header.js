import React from 'react';

function Header({total}){
 
    return(
        <header>
            <div id="logo">
                <h1 className="font-effect-neon">Cocktail</h1>
                <h4 className="face-off-font">FACE/OFF</h4>
            </div>
            <label className='header'>Total Votes Cast: {total} </label>
   
       </header>
   )



}
export default Header;
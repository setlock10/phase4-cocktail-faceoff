import React,{useState} from 'react';
import './App.css';
import CocktailCard from './CocktailCard';

function FaceOff({handleDrinkClick1,handleDrinkClick2,drink1,drink2}) {
    
    //Set Random Cocktails to FaceOff
    // const [idDrink1, setIdDrink1] = useState(0)
    // const [idDrink2, setIdDrink2] = useState(0)

    
 
    return(
        <div id="drinks">
            <CocktailCard left={100} drink={drink1} handleDrinkClick={handleDrinkClick1}  />
            <h2 className="versus">VS.</h2> 
            <CocktailCard left={550} drink={drink2} handleDrinkClick={handleDrinkClick2} />
        </div>
            
       
    );
}

export default FaceOff;
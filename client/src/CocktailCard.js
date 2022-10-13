function CocktailCard({left,drink,handleDrinkClick}) {

    //style={{'font-size': '60px'}}drink.strIngredient1=" "
    if (drink.strIngredient2===null) drink.strIngredient2=" "
    if (drink.strIngredient3===null) drink.strIngredient3=" "
    if (drink.strIngredient4===null) drink.strIngredient4=" "
    if (drink.strIngredient5===null) drink.strIngredient5=" "
    if (drink.strMeasure1===null) drink.strMeasure1=" "
    if (drink.strMeasure2===null) drink.strMeasure2=" "
    if (drink.strMeasure3===null) drink.strMeasure3=" "
    if (drink.strMeasure4===null) drink.strMeasure4=" "
    if (drink.strMeasure5===null) drink.strMeasure5=" "


    return(
        <div onClick={()=>handleDrinkClick(drink.strDrink)}  style={{'left':left}} className="cocktail" >
            <h2  id="cocktail-name">{drink.strDrink}</h2>
            <img alt={drink.strDrink} id="cocktail-image" src={drink.strDrinkThumb} />
            <ul className="cocktail-recipe">
                <li id="cocktail-recipe1">{drink.strMeasure1+" "+drink.strIngredient1}</li>
                <li id="cocktail-recipe2">{drink.strMeasure2+" "+drink.strIngredient2}</li>
                <li id="cocktail-recipe3">{drink.strMeasure3+" "+drink.strIngredient3}</li>
                <li id="cocktail-recipe4">{drink.strMeasure4+" "+drink.strIngredient4}</li>
                <li id="cocktail-recipe5">{drink.strMeasure5+" "+drink.strIngredient5}</li>
            </ul>
        </div>
       
    );
}

export default CocktailCard;
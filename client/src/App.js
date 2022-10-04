import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import './App.css';
import FaceOff from './FaceOff';

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);


  const [drinkWinner,setDrinkWinner]=useState(0)
  const [drink1,setDrink1]=useState({})
  const [drink2,setDrink2]=useState({})

  //Get two drinks

  useEffect(()=>{
    fetch("/random2/")
    .then((r) => r.json())
    .then(data=>{
      console.log(data)
      setDrink1(data[0])
      setDrink2(data[1])
    })
    .catch(e=>console.error(e))

  }, []);


    //Helper Functions

    function updateTotalRankings(){

        fetch("/total_ratings/1",{
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              total: 1
            }),
          });
          
    }

    //Event Handlers

    function handleDrinkClick1(strDrink){
      setDrinkWinner(1)
      updateTotalRankings()
      //updateDrinkRatings()
      console.log("drink1 winner "+strDrink)
      // getRandomDrinkNumbers()
      // getDrinkRatings(drinksData[random1],25)
      // getDrinkRatings(drinksData[random2],(-25))
  

  }
  function handleDrinkClick2(strDrink){
    setDrinkWinner(2)
    updateTotalRankings()
    //updateDrinkRatings()
    console.log("drink2 winner "+strDrink)
    // getRandomDrinkNumbers()
    // getDrinkRatings(drinksData[random2],25)
    // getDrinkRatings(drinksData[random1],(-25))
}




  return (
    <div className="App">
      <Header />
      <FaceOff    handleDrinkClick1={handleDrinkClick1} handleDrinkClick2={handleDrinkClick2}  drink1={drink1} drink2={drink2} />
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './Header';
import './App.css';
import FaceOff from './FaceOff';
import Login from './Login';

function App() {
   const [total, setTotal] = useState(0);


  // const [user, setuser] = useState=(null)

  
  // useEffect(() => {
  //   fetch("/hello")
  //     .then((r) => r.json())
  //     .then((data) => setCount(data.count));
  // }, []);


  const [drinkWinner,setDrinkWinner]=useState(0)
  const [drink1,setDrink1]=useState({})
  const [drink2,setDrink2]=useState({})

  //Get total rankings
  useEffect(()=>{
    updateTotalRankings()
  },[])

  //Get two drinks

  useEffect(()=>{
    fetch("/random2")
    .then((r) => r.json())
    .then(data=>{
      console.log(data)
      setDrink1(data[0])
      setDrink2(data[1])
    })
    .catch(e=>console.error(e))

  }, []);


    //Helper Functions

    function calcElo(drinkWinner,drinkLoser){
      //test 2
      //new comment 3
          let tempRating1=drinkWinner.rating
          let tempRating2=drinkLoser.rating
          let kFactor=100
      
          var prob1
          var prob2
      
         
      
          prob1 =(1.0/(1.0+ Math.pow(10,((tempRating2-tempRating1)/400))))
          prob2 =(1.0/(1.0+ Math.pow(10,((tempRating1-tempRating2)/400))))
          console.log(`Probalility 1: ${prob1.toFixed(3)*100}%`)
          console.log(`Probalility 2: ${prob2.toFixed(3)*100}%`)
      
          
          drinkWinner.rating=parseInt(tempRating1+kFactor*(1-prob1))
          drinkLoser.rating=parseInt(tempRating2+kFactor*(0-prob2))
       
       }

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
        })
        .then (r=>r.json())
        .then (total=> {
          console.log(total)
          setTotal(total)
        })
    }

    //Event Handlers

    function handleDrinkClick1(strDrink){
      setDrinkWinner(1)
      updateTotalRankings()
      //updateDrinkRatings()
      console.log("drink1 winner "+drink1.strDrink)
      console.log("rating before win"+drink1.rating)
      calcElo(drink1,drink2)
      console.log("rating after win"+drink1.rating)
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
    <BrowserRouter>
    <div className="App">
      <Header total={total}/>
      <Login/>
       <Switch>
        <Route  path="/">
          <FaceOff    handleDrinkClick1={handleDrinkClick1} handleDrinkClick2={handleDrinkClick2}  drink1={drink1} drink2={drink2} />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
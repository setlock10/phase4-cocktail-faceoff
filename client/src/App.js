import { useState, useEffect } from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './Header';
import './App.css';
import FaceOff from './FaceOff';
import Login from './Login';
import NavBar from "./NavBar";
import GlobalRankings from "./GlobalRankings";
import { useHistory } from "react-router-dom";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  //Check Login Staus
  
  

  useEffect(()=>{
   // if (isAuthenticated){
    fetch('/me')
    .then(res=>res.json())
    .then(data=> {
      //debugger
      setUser(data)
      setIsAuthenticated(true)
    })


  },[])

//     .then((user)=>{
//       setUser(user)
//       console.log("user " + user)          
//       setIsAuthenticated(true)
//         })
      
//     })
//  // }




  //Get total rankings
  useEffect(()=>{
    updateTotalRankings()
    getDrinks()
  },[])

  //Get two drinks
  function getDrinks(){
    fetch("/random2")
    .then((r) => r.json())
    .then(data=>{
      //console.log(data)
      setDrink1(data[0])
      setDrink2(data[1])
    })
    .catch(e=>console.error(e))


  }

 
    //Helper Functions

    function  updatUserRatings(winner){
      //console.log("chill")
      
      var userRating1= 1500
      var userRating2=1500
      // check to see if drink1 exists for this user
      //get rating if yes, if no set to 1500
      
 //****** FIRST FETCH *******//
      fetch ('/hasdrink',{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
            "Accept": "application/json",
          },
        body: JSON.stringify({
          user_id: user.id,
          drink_id: drink1.id
        })
      })
      .then (r=>r.json())
      .then (data=> {
       // debugger
        if(data!==null) userRating1=data.rating
        console.log(userRating1)

//****** SECOND FETCH *******//

      // check to see if drink2 exists for this user
       //get rating if yes, if no set to 1500
       fetch ('/hasdrink',{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        body: JSON.stringify({
          user_id:user.id,
          drink_id: drink2.id
        })
      })
      .then (r=>r.json())
      .then (data=> {
        //debugger
        if(data!==null) userRating2=data.rating
        console.log(userRating2)

     
//****** ELO CALC *******//

     console.log(winner)

     //let tempRating1=drinkWinner.rating
     //  let tempRating2=drinkLoser.rating
       let kFactor=100
   
       var prob1
       var prob2
       var newuserRating1
       var newuserRating2
   
       prob1 =(1.0/(1.0+ Math.pow(10,((userRating2-userRating1)/400))))
       prob2 =(1.0/(1.0+ Math.pow(10,((userRating1-userRating2)/400))))
       console.log(`Probalility 1: ${prob1.toFixed(3)*100}%`)
       console.log(`Probalility 2: ${prob2.toFixed(3)*100}%`)
   
       if (winner===1){
        newuserRating1=parseInt(userRating1+kFactor*(1-prob1))
        newuserRating2=parseInt(userRating2+kFactor*(0-prob2))
       }
       else{
          newuserRating2=parseInt(userRating2+kFactor*(1-prob1))
          newuserRating1=parseInt(userRating1+kFactor*(0-prob2))

       }

       console.log("new1 "+ newuserRating1)
       console.log("new2 "+ newuserRating2)

//****** FIRST POST *******//

       fetch ("/user_drink_ratings",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            drink_id: drink1.id,
            rating: newuserRating1
          })
      })
      .then (r=>r.json())
      .then (data=>{

//****** SECOND POST *******//

          fetch ("/user_drink_ratings",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({
                user_id: user.id,
                drink_id: drink2.id,
                rating: newuserRating2
              })
          })
          .then (r=>r.json())

        
      }) //end of first post



       }) //end of second fetch

       }) //end of first fetch
       
 




 //debugger

      // update/create entry for drink1 and drink2














    }

    function  updateGlobalRatings(){

      
      fetch(`/drinks/${drink1.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            rating: drink1.rating
          }),
      })
      .then (r=>r.json())
      // .then (data=> {
      //   console.log(data)
        
      // })

      fetch(`/drinks/${drink2.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            rating: drink2.rating
          }),
      })
      .then (r=>r.json())
      // .then (data=> {
      //   console.log(data)
        
      // })


    }

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
          //debugger
          //console.log(total)
          setTotal(total)
        })
    }

    //Event Handlers

    function handleDrinkClick1(strDrink){
      setDrinkWinner(1)
      var winner=1
      updateTotalRankings()
      //updateDrinkRatings()
      console.log("drink1 winner "+drink1.strDrink)
      console.log("rating before win "+drink1.rating)
      calcElo(drink1,drink2)
      console.log("rating after win "+drink1.rating)
      updateGlobalRatings()
      updatUserRatings(winner)
      getDrinks()

      // getRandomDrinkNumbers()
      // getDrinkRatings(drinksData[random1],25)
      // getDrinkRatings(drinksData[random2],(-25))
  

  }
  function handleDrinkClick2(strDrink){
    setDrinkWinner(2)
    var winner=2
    updateTotalRankings()
    //updateDrinkRatings()
    console.log("drink2 winner "+strDrink)
    updateGlobalRatings()
    updatUserRatings(winner)
    getDrinks()

    // getRandomDrinkNumbers()
    // getDrinkRatings(drinksData[random2],25)
    // getDrinkRatings(drinksData[random1],(-25))
}

//  const [page, setPage] = useState("/faceoff")

//  let history = useHistory();
 
 //history.push(page)

  return (
    <div className="App">
    <BrowserRouter>
      <Header total={total}/>
      <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>
      <NavBar />
       <Switch>
        <Route  path="/faceoff">
          <FaceOff    handleDrinkClick1={handleDrinkClick1} handleDrinkClick2={handleDrinkClick2}  drink1={drink1} drink2={drink2} />
        </Route>
        <Route path="/globalranks">
          <GlobalRankings/>
        </Route>
       
      </Switch>
    </BrowserRouter>
      </div>
  );
}

export default App;
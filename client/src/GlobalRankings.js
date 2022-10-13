import React from 'react';
import { useState, useEffect } from "react";

function GlobalRankings(){

    const [ranks, setRanks] = useState([]);
    const [rank01, setRank01] = useState([]);
    const [rank02, setRank02] = useState([]);
    const [rank03, setRank03] = useState([]);
    const [rank04, setRank04] = useState([]);
    const [rank05, setRank05] = useState([]);
    const [rank06, setRank06] = useState([]);
    const [rank07, setRank07] = useState([]);
    const [rank08, setRank08] = useState([]);
    const [rank09, setRank09] = useState([]);
    const [rank10, setRank10] = useState([]);
   

     useEffect(()=>{
        fetch ('/globalrank')
        .then((r) => r.json())
        .then(data=>{
            setRank01(data[0])
            setRank02(data[1])
            setRank03(data[2])
            setRank04(data[3])
            setRank05(data[4])
            setRank06(data[5])
            setRank07(data[6])
            setRank08(data[7])
            setRank09(data[8])
            setRank10(data[9])
            
          console.log(rank01)
         

         //debugger
        })
     

     },[])

   // debugger
   
 
    return(
        <div className='rankings'>
            <ol>
            <li>{rank01[1] +"  " +rank01[0]}</li>
            <li>{rank02[1] +"  " +rank02[0]}</li>
            <li>{rank03[1] +"  " +rank03[0]}</li>
            <li>{rank04[1] +"  " +rank04[0]}</li>
            <li>{rank05[1] +"  " +rank05[0]}</li>
            <li>{rank06[1] +"  " +rank06[0]}</li>
            <li>{rank07[1] +"  " +rank07[0]}</li>
            <li>{rank08[1] +"  " +rank08[0]}</li>
            <li>{rank09[1] +"  " +rank09[0]}</li>
            <li>{rank10[1] +"  " +rank10[0]}</li>
            </ol>
   
       </div>
   )



}
export default GlobalRankings;
import React,{useState,useEffect,useContext} from 'react'
import './Home.css'
import Console from '../Conponent/Console'
import Explore from '../Conponent/Explore'
export default function Home() {
    const [ModeState,SetModeState] = useState("Console")
  return (
    <div className='Home_Main_div'>
        <div className='Mode_Select_div'>
            {ModeState === "Console"&&<div style={{backgroundColor:'#FF5858',color:"white"}}>Console</div>}
            {ModeState === "Explore"&&<div onClick={()=>{SetModeState("Console")}} style={{backgroundColor:'while',color:"#FF5858"}}>Console</div>}
            {ModeState === "Explore"&&<div style={{backgroundColor:'#FF5858',color:"white"}}>Explore</div>}
            {ModeState === "Console"&&<div onClick={()=>{SetModeState("Explore")}} style={{backgroundColor:'white',color:"#FF5858"}}>Explore</div>}
        </div>

        {ModeState === "Console" && <Console/>} 
        {ModeState === "Explore" && <Explore/>}

    </div>
  )
}

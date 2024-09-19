import React,{useState} from 'react'
import './NavBar.css'
import { AiOutlineMenu } from "react-icons/ai";
import Menu from './Menu';
export default function NavBar() {
  const [MenuState,SetMenuState] = useState(false)
  return (
    <div className='NavBar_Main_Div'>
      <div className='Space'></div>
      <div className='SpaceM'>
        <img  src={require("./../Media/BigLogo.png")} alt='LOGO'/>
      </div>
      <div className='Space'>
        <AiOutlineMenu className='MenuIcon' onClick={()=>{if(!MenuState){SetMenuState(true)}else{SetMenuState(false)}}}/>
      </div>
      

      {MenuState&&<Menu SetMenuState={SetMenuState}/>}
      
    </div>
  )
}

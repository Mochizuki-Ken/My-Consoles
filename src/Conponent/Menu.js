import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
import { AiFillCaretRight } from "react-icons/ai";
import firebase from './../Service/Service'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
export default function Menu({SetMenuState}) {
  return (
    <div className='Menu_Main_div'>
      <div className='Top_div'>
        <label className='Menu_label'>Menu</label>
        <AiFillCaretRight onClick={()=>{SetMenuState(false)}} className='Icon' />
      </div>
      <div className='Content_div'>
        <Link className='Link' to={'/'}>Console</Link>
        <Link className='Link' to={'/about'}>About US</Link>
        {/* <Link className='Link' to={'/content'}>Content US</Link> */}
        <button className='Link' onClick={()=>{firebase.auth().signOut()}}>Sign Out</button>
      </div>
    </div>
  )
}

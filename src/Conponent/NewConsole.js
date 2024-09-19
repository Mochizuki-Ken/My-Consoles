import React,{useState,useEffect,useContext} from 'react'
import "./NewConsole.css"
import firebase from './../Service/Service'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import {AuthContext} from './../App'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
export default function NewConsole({CancelFunction,Index,LoadConsolesData}) {
    const {AuthData,SetAuthData}=useContext(AuthContext)
    const [Done,SetDone] = useState(false)

    const [ConsoleName,SetConsoleName] = useState("Empty")

    function CreateConsole(){
        if(ConsoleName==="Empty"){
            return "ConsoleName Empty"
        }
        if(firebase.auth().currentUser!==null){
            firebase.firestore().collection('Consoles').add(
                {
                  Author:firebase.auth().currentUser.uid,
                  ConsoleName:ConsoleName,
                  Index:Index+1,
                  ContentLen:0
                }
              ).then(()=>{
                LoadConsolesData()
                SetDone(true)
              })
        }
        
    }


  return (
    <div className='NewConsole_Background_div'>
        <div className='NewConsole_Main_div'>
            <label className='NewConsole'>NEW CONSOLE</label>

            {!Done&&<div className='Console_Info_div'>
                <label>Console Name</label>
                <input type={"text"} value={ConsoleName} onChange={(e)=>{SetConsoleName(e.target.value)}}/>
            </div>}

            {Done&&<IoCheckmarkCircleOutline className='DoneIcon'/>}
            
            <div className='Row_div'>
                {!Done&&<button onClick={()=>{CancelFunction("")}}>Back</button>}
                {!Done&&<button onClick={CreateConsole}>Create</button>}
                {Done&&<button onClick={()=>{CancelFunction("")}}>Done</button>}
            </div>
        </div>
    </div>
  )
}

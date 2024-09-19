import React,{useContext} from 'react'
import './Auth.css'
import firebase from './../Service/Service'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { FcGoogle } from "react-icons/fc";
import {AuthContext} from './../App'
import { useNavigate } from 'react-router-dom'

export default function Auth() {

    const {AuthData,SetAuthData}=useContext(AuthContext)

    const GoTo=useNavigate()

    function LoginWithGoogle(){
        const google_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(google_provider).then((AuthData)=>{
          firebase.firestore().collection('Users').doc(AuthData.user.uid).get().then((data)=>{
            if(data.data()===undefined){
              firebase.firestore().collection('Users').doc(AuthData.user.uid).set(
                {
                  UserID:AuthData.user.uid,
                  UserEmail:AuthData.user.email,
                  UserName:AuthData.user.displayName
                }
              )
              firebase.firestore().collection('Consoles').doc(AuthData.user.uid).set(
                {
                  Author:AuthData.user.uid,
                  ConsoleName:"Daily",
                  Index:0,
                  ContentLen:0
                }
              )
              SetAuthData({...AuthData.user,user_state:true})
              GoTo('/')
            }else{
              SetAuthData({...data.data(),...AuthData.user,user_state:true})
              GoTo('/')
            }
          })
          
          
        })
      }

  return (
    <div className='Auth_Main_div'>
        <div className='func_div'>
            <label className='f1'>START</label>
            <label className='f3'>with</label>
            <div onClick={LoginWithGoogle}  className='login_btn'> Google <FcGoogle className='icon'/></div>
        </div>
    </div>
  )
}

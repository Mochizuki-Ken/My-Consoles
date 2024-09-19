import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import React,{useState,createContext,useEffect} from 'react';
import NavBar from './Conponent/NavBar';
import firebase from './Service/Service';
import 'firebase/compat/auth'
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import About from './Pages/About';
import Content from './Pages/Content';

export const AuthContext=createContext(null)
function App() {

  const [AuthData,SetAuthData]=useState({user_state:false})
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if  (user){
        firebase.firestore().collection('Users').doc(user.uid).get().then((data)=>{
          SetAuthData({...data.data(),...user,user_state:true})
        })
        
      }else{
        SetAuthData({user_state:false})
      }
    })
  },[])

  return (
    <BrowserRouter >
      <AuthContext.Provider  value={{AuthData,SetAuthData}}>
        <div className='Outline_div'>
        <NavBar/>
      <Routes>
        {AuthData.user_state === false && <Route element={<Auth/>} path='/'/>}
        <Route element={<About/>} path='/about'/>
        <Route element={<Content/>} path='/content'/>
        <Route element={<Home/>} path='/*'/>
      </Routes>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import React,{useContext, useState} from 'react'
import './NewOption.css'
import IconTextButton from './IconTextButton';
import { IoLink,IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiFillAppstore } from "react-icons/ai";
import firebase from './../Service/Service'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import {AuthContext} from './../App'

export default function NewOption({CancelFunction,CurrentConsole,CurrentPath,Index,ParentId,ParentType,LoadLinkAndGroupData,PathRecord}) {
    const {AuthData,SetAuthData}=useContext(AuthContext)
    
    const [NewType,SetNewType]= useState("None")
    const [NewTypeInfo,SetNewTypeInfo]= useState({Name:"Empty",Url:"Empty",UserName:"",UserPasword:"",Description:""})

    function CreateLinkOrGroup(){
        if(NewType==="Link"){
            if(NewTypeInfo.Name==="Empty" || NewTypeInfo.Url==="Empty" || NewTypeInfo.Name === CurrentConsole){
                return "Info Missing"
            }
        }else if(NewType==="Group"){
            if(NewTypeInfo.Name==="Empty" || NewTypeInfo.Name === CurrentConsole){
                return "Info Missing"
            }
        }
        if(firebase.auth().currentUser!==null){
            let PathIdRecord = []
            PathRecord.forEach((e)=>{
                PathIdRecord.push(e.Id)
            })
            if(ParentType){
                firebase.firestore().collection("Consoles").doc(ParentId).update({
                    ContentLen:firebase.firestore.FieldValue.increment(1)
                })
            }else{
                firebase.firestore().collection("LinksOrGroups").doc(ParentId).update({
                    ContentLen:firebase.firestore.FieldValue.increment(1)
                })
            }
            
            firebase.firestore().collection('LinksOrGroups').add(
                {
                  Type:NewType,
                  Name:NewTypeInfo.Name,
                  Url:NewTypeInfo.Url,
                  UserName:NewTypeInfo.UserName,
                  UserPassword:NewTypeInfo.UserPasword,
                  Description:NewTypeInfo.Description,
                  ParentPath:CurrentPath,//
                  RootConsole:CurrentConsole,
                  Paths:PathIdRecord,
                  ContentLen:0,
                  Author:firebase.auth().currentUser.uid,
                  Index:Index+1
                }
              ).then(()=>{
                SetNewType("Done")
                LoadLinkAndGroupData()
              })
        }
        
    }

  return (
    <div className='New_Option_Background_div'>
        <div className='New_Option_div'>
            {NewType==="None"&&<label className='Add_Path'>NEW</label>}
            {NewType!=="None"&&<label className='Add_Path'>CREATE {NewType}{PathRecord.map((e)=>{return " > " + e.Name})}{" > "}{NewTypeInfo.Name}</label>}
            {NewType==="None"&&<div className='Row_div'>
                <IconTextButton OnClick={()=>{SetNewType("Link")}} Icon={<IoLink className='Icon'/>} text={"New Link"}/>
                <IconTextButton OnClick={()=>{SetNewType("Group")}} Icon={<AiFillAppstore className='Icon'/>} text={"New Group"}/>
            </div>}
            {NewType==="Link"&&<div className='New_Link_Info_div'>
                <label>Link Name *</label>
                <input type={"text"} value={NewTypeInfo.Name} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Name:e.target.value})}}/>

                <label>Link Url *</label>
                <input type={"url"} value={NewTypeInfo.Url} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Url:e.target.value})}}/>

                <label>Link UserName</label>
                <input type={"text"} value={NewTypeInfo.UserName} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,UserName:e.target.value})}}/>

                <label>Link Password</label>
                <input type={"text"} value={NewTypeInfo.UserPasword} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,UserPasword:e.target.value})}}/>

                <label>Link Description</label>
                <textarea type={"text"} value={NewTypeInfo.Description} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Description:e.target.value})}}/>
            </div>}
            {NewType==="Group"&&<div className='New_Link_Info_div'>
                <label>Group Name *</label>
                <input type={"text"} value={NewTypeInfo.Name} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Name:e.target.value})}}/>

                <label>Group Url </label>
                <input type={"url"} value={NewTypeInfo.Url} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Url:e.target.value})}}/>

                <label>Group UserName</label>
                <input type={"text"} value={NewTypeInfo.UserName} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,UserName:e.target.value})}}/>

                <label>Group Password</label>
                <input type={"text"} value={NewTypeInfo.UserPasword} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,UserPasword:e.target.value})}}/>

                <label>Group Description</label>
                <textarea type={"text"} value={NewTypeInfo.Description} onChange={(e)=>{SetNewTypeInfo({...NewTypeInfo,Description:e.target.value})}}/>
            </div>}
            {NewType==="Done"&&<IoCheckmarkCircleOutline className='DoneIcon'/>}
            <div className='Btn_div'>
                {NewType!=="Done"&&<button onClick={()=>{if(NewType!=="None"){SetNewType("None")}else{CancelFunction(false)}}}>Back</button>}
                {NewType==="Done"&&<button onClick={()=>{CancelFunction(false)}}>Done</button>}
                {NewType!=="None"&&NewType!=="Done"&&<button onClick={()=>{CreateLinkOrGroup()}}>CREATE</button>}
            </div>
        </div>
        
    </div>
  )
}

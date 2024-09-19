import React,{useState} from 'react'
import './GroupCard.css'
import { AiFillAppstore } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsArrowLeftCircle,BsArrowRightCircle } from "react-icons/bs";
export default function GroupCard({Info,EditMode,MoveElementIndex,OpenGroup,UpdateGroupOrLink,DeleteGroupOrLink}) {
  const [MoreState,SetMoreState] = useState(false)
  const [InfoData,SetInfo]= useState({id:Info.id,Type:"Group",Name:Info.Name,Url:Info.Url,UserName:Info.UserName,UserPassword:Info.UserPassword,Description:Info.Description,ParentPath:Info.ParentPath,//
  ContentLen:Info.ContentLen,Index:Info.Index})
  const [UpdateState,SetUpdateState] = useState(false)
  return (
    <div className='GroupCard_Main_div'>
      <div className='Name_div'>
        <AiFillAppstore className='Icon'/>
        <label>{Info.Name}</label>
      </div>
      {Info.Url!=="Empty"&&<label onClick={()=>{window.open(Info.Url, "_blank");}} className='Url_label'>{Info.Url}</label>}
      <div className='Row_div'>
        <button onClick={()=>{OpenGroup(Info.Name,Info.id)}}>OPEN</button>
        <button onClick={()=>{SetMoreState(true)}}>MORE</button>
        {EditMode&&
        <div className='Edit_Btn_div'>
          <BsArrowLeftCircle className='Icon' onClick={()=>{MoveElementIndex(Info.id,Info.Index,"Left")}}/>
          <MdDelete onClick={()=>{DeleteGroupOrLink(Info.id,Info.Index)}} className='Icon'/>
          <BsArrowRightCircle className='Icon' onClick={()=>{MoveElementIndex(Info.id,Info.Index,"Right")}}/>
        </div>}
      </div>

      
      {MoreState&&<div className='MoreInfo_Background_div'>
        <div className='MoreInfo_Main_div'>
          <div className='Name_div'>
            <AiFillAppstore className='Icon' onClick={()=>{window.open(Info.Url, "_blank");}}/>
            <label>{Info.Name}</label>
          </div>
          <div className='MoreInfo_Main_Info_div'>
            <label>Group Name *</label>
            <input type={"text"} value={InfoData.Name} onChange={(e)=>{SetInfo({...InfoData,Name:e.target.value});SetUpdateState(true)}}/>

            <label>Group Url </label>
            <input type={"url"} value={InfoData.Url} onChange={(e)=>{SetInfo({...InfoData,Url:e.target.value});SetUpdateState(true)}}/>

            <label>Group UserName</label>
            <input type={"text"} value={InfoData.UserName} onChange={(e)=>{SetInfo({...InfoData,UserName:e.target.value});SetUpdateState(true)}}/>
            
            <label>Group Password</label>
            <input type={"text"} value={InfoData.UserPassword} onChange={(e)=>{SetInfo({...InfoData,UserPasword:e.target.value});SetUpdateState(true)}}/>

            <label>Group Description</label>
            <textarea type={"text"} value={InfoData.Description} onChange={(e)=>{SetInfo({...InfoData,Description:e.target.value});SetUpdateState(true)}}/>
          </div>
          
          <div className='Row_div'>
            <MdDelete onClick={()=>{DeleteGroupOrLink(Info.id,Info.Index)}} className='DeleteIcon'/>
            <button onClick={()=>{SetMoreState(false)}}>Back</button>
            {UpdateState&&<button onClick={()=>{if(UpdateGroupOrLink(InfoData)==="Info Missing"){alert("Info Missing")}}}>UPDATE</button>}
          </div>
        </div>
      </div>}

    </div>
  )
}

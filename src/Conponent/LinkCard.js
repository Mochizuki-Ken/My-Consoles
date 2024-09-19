import React,{useState} from 'react'
import "./LinkCard.css"
import { IoLink } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsArrowLeftCircle,BsArrowRightCircle } from "react-icons/bs";
export default function LinkCard({Info,EditMode,MoveElementIndex,UpdateGroupOrLink,DeleteGroupOrLink}) {
  const [MoreState,SetMoreState] = useState(false)
  const [InfoData,SetInfo]= useState({id:Info.id,Type:"Link",Name:Info.Name,Url:Info.Url,UserName:Info.UserName,UserPassword:Info.UserPassword,Description:Info.Description,ParentPath:Info.ParentPath,//
  ContentLen:Info.ContentLen,Index:Info.Index})
  const [UpdateState,SetUpdateState] = useState(false)

  return (
    <div className='LinkCard_Main_div'>
      <div className='Name_div'>
        <IoLink className='Icon'/>
        <label>{Info.Name}</label>
      </div>
      <label onClick={()=>{window.open(Info.Url, "_blank");}} className='Url_label'>{Info.Url}</label>
      <div className='Row_div'>
        <button onClick={()=>{window.open(Info.Url, "_blank");}}>GO</button>
        <button onClick={()=>{SetMoreState(true)}}>MORE</button>

        {EditMode&&
        <div className='Edit_Btn_div'>
          <BsArrowLeftCircle className='Icon' onClick={()=>{MoveElementIndex(Info.id,Info.Index,"Left")}}/>
          <MdDelete onClick={()=>{DeleteGroupOrLink(Info.id,Info.Index)}}className='Icon'/>
          <BsArrowRightCircle className='Icon' onClick={()=>{MoveElementIndex(Info.id,Info.Index,"Right")}}/>
        </div>}
      </div>
      

      {MoreState&&<div className='MoreInfo_Background_div'>
        <div className='MoreInfo_Main_div'>
          <div className='Name_div'>
            <IoLink className='Icon' onClick={()=>{window.open(Info.Url, "_blank");}}/>
            <label>{Info.Name}</label>
          </div>
          <div className='MoreInfo_Main_Info_div'>
            <label>Link Name *</label>
            <input type={"text"} value={InfoData.Name} onChange={(e)=>{SetInfo({...InfoData,Name:e.target.value});SetUpdateState(true)}}/>

            <label>Link Url *</label>
            <input type={"url"} value={InfoData.Url} onChange={(e)=>{SetInfo({...InfoData,Url:e.target.value});SetUpdateState(true)}}/>

            <label>Link UserName</label>
            <input type={"text"} value={InfoData.UserName} onChange={(e)=>{SetInfo({...InfoData,UserName:e.target.value});SetUpdateState(true)}}/>
            <label>Link Password</label>
            <input type={"text"} value={InfoData.UserPassword} onChange={(e)=>{SetInfo({...InfoData,UserPasword:e.target.value});SetUpdateState(true)}}/>

            <label>Link Description</label>
            <textarea type={"text"} value={InfoData.Description} onChange={(e)=>{SetInfo({...InfoData,Description:e.target.value});SetUpdateState(true)}}/>
          </div>
          
          <div className='Row_div'>
            <MdDelete onClick={()=>{DeleteGroupOrLink(Info.id,Info.Index)}}className='DeleteIcon'/>
            <button onClick={()=>{SetMoreState(false)}}>Back</button>
            {UpdateState&&<button onClick={()=>{if(UpdateGroupOrLink(InfoData)==="Done"){alert("Update Success")}}}>UPDATE</button>}
          </div>
        </div>
      </div>}
    </div>
  )
}

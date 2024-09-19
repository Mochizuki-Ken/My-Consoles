import React,{useState,useEffect,useContext} from 'react'
import './Console.css'
import { IoLink } from "react-icons/io5";
import { AiFillAppstore } from "react-icons/ai";
import './IconTextButton.css'
import IconTextButton from './IconTextButton';
import NewOption from './NewOption';
import firebase from './../Service/Service'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import NewConsole from './NewConsole';
import {AuthContext} from './../App'
import GroupCard from './GroupCard';
import LinkCard from './LinkCard';
import { BsArrowLeftCircle,BsArrowRightCircle } from "react-icons/bs";


export default function Console() {
    const {AuthData,SetAuthData}=useContext(AuthContext)
    const [SearchText,SetSearchText] = useState("")
    const [NewState,SetNewState] = useState("")
    const [EditMode,SetEditMode] = useState(false)
    const [CurrentConsole,SetCurrentConsole] = useState([])
    const [CurrentGroup,SetCurrentGroup] = useState([])
    const [CurrentGroupId,SetCurrentGroupId] = useState(null)
    const [Consoles,SetConsoles] = useState([])
    const [Datas,SetDatas] = useState([])
    const [PathRecord,SetPathRecord] = useState([])


    function OpenGroup(Name,Id){
        SetCurrentGroup(Name)
        SetCurrentGroupId(Id)
        SetPathRecord([...PathRecord,{Name:Name,Id:Id}])
        console.log(PathRecord)
        firebase.firestore().collection("LinksOrGroups").where("Author","==",firebase.auth().currentUser.uid).where("ParentPath","==",CurrentGroup).onSnapshot((data)=>{
            let datas = data.docs.map((doc) => {
              return {...doc.data(),id:doc.id};
            })
            datas.sort((a,b)=>{
                return a.Index - b.Index;
            })
            SetDatas(datas)

        })
    }

    function MoveElementIndex(Id,Index,Mode){
        if(Mode==="Left"){

            Datas.forEach((e)=>{
                if(Index-1 === e.Index){
                    firebase.firestore().collection('LinksOrGroups').doc(e.id).update({
                        Index:firebase.firestore.FieldValue.increment(1)
                    })
                }
            })
            firebase.firestore().collection('LinksOrGroups').doc(Id).update({
                Index:firebase.firestore.FieldValue.increment(-1)
            })

        }else if(Mode==="Right"){
            Datas.forEach((e)=>{
                if(Index+1 === e.Index){
                    firebase.firestore().collection('LinksOrGroups').doc(e.id).update({
                        Index:firebase.firestore.FieldValue.increment(-1)
                    })
                }
            })
            firebase.firestore().collection('LinksOrGroups').doc(Id).update({
                Index:firebase.firestore.FieldValue.increment(1)
            })
        }
    }

    function LoadConsolesData(){
        // alert()
        if(firebase.auth().currentUser!==null){
            firebase.firestore().collection("Consoles").where("Author","==",firebase.auth().currentUser.uid).get().then((data)=>{
                let datas = data.docs.map((doc) => {
                    return {...doc.data(),id:doc.id};
                })
                datas.sort((a,b)=>{
                    return a.Index - b.Index;
                })
                SetConsoles(datas)
                SetCurrentConsole(datas[0].ConsoleName)
                SetCurrentGroup(datas[0].ConsoleName)
                SetCurrentGroupId(datas[0].id)
                SetPathRecord([{Name:datas[0].ConsoleName,Id:datas[0].id}])
    
            })
        }
    }

    useEffect(()=>{
        LoadConsolesData()
    },[AuthData])

    function LoadLinkAndGroupData(){
            if(firebase.auth().currentUser!==null){
        
                firebase.firestore().collection("LinksOrGroups").where("Author","==",firebase.auth().currentUser.uid).where("ParentPath","==",CurrentGroup).get().then((data)=>{
                    let datas = data.docs.map((doc) => {
                      return {...doc.data(),id:doc.id};
                    })
                    datas.sort((a,b)=>{
                        return a.Index - b.Index;
                    })
                    SetDatas(datas)
        
                })
            }
            
    
        
    }

    useEffect(()=>{
        LoadLinkAndGroupData()

    },[CurrentConsole,AuthData,CurrentGroup])

    function UpdateGroupOrLink(Info){
        if(Info.Type==="Link"){
            if(Info.Name==="Empty" || Info.Url==="Empty" || Info.Name==="" || Info.Url===""){
                return "Info Missing"
            }
        }else if(Info.Type==="Group"){
            if(Info.Name==="Empty" || Info.Name===""){
                return "Info Missing"
            }
        }
        if(firebase.auth().currentUser!==null){
            firebase.firestore().collection('LinksOrGroups').doc(Info.id).update(
                {
                  Type:Info.Type,
                  Name:Info.Name,
                  Url:Info.Url,
                  UserName:Info.UserName,
                  UserPassword:Info.UserPassword,
                  Description:Info.Description,
                  ParentPath:Info.ParentPath,//
                  ContentLen:Info.ContentLen,
                  Author:firebase.auth().currentUser.uid,
                  Index:Info.Index
                }
              ).then(()=>{
                alert("Update Success")
                return("Done")
            })
        }
        
    }

    function DeleteGroupOrLink(Id,Index){
        let NewDatas = []
        
        Datas.forEach((e)=>{
            if(e.Index>Index){
                e.Index-=1
                NewDatas.push(e)
            }
        })
        firebase.firestore().collection('LinksOrGroups').doc(Id).delete().then(()=>{
            NewDatas.forEach((e)=>{
                firebase.firestore().collection('LinksOrGroups').doc(e.id).update({
                    Index:e.Index
                })
            })

            firebase.firestore().collection('LinksOrGroups').where("Paths","array-contains",Id).get().then((data)=>{
                data.docs.forEach((doc) => {
                    firebase.firestore().collection('LinksOrGroups').doc(doc.id).delete()
                })
                
    
            })
            
            if(PathRecord.length<=1){
                firebase.firestore().collection('Consoles').doc(PathRecord[PathRecord.length-1].Id).update({
                    ContentLen:firebase.firestore.FieldValue.increment(-1)
                })
            }else{
                firebase.firestore().collection('LinksOrGroups').doc(PathRecord[PathRecord.length-1].Id).update({
                    ContentLen:firebase.firestore.FieldValue.increment(-1)
                })
            }
            LoadLinkAndGroupData()
        })
    }

    function DeleteConsole(){
        firebase.firestore().collection("LinksOrGroups").where("Author","==",firebase.auth().currentUser.uid).where("RootConsole","==",CurrentConsole).get().then((data)=>{
            data.docs.forEach((doc) => {
                firebase.firestore().collection("LinksOrGroups").doc(doc.id).delete()
            })
        })
        Consoles.forEach((e)=>{
            if(e.ConsoleName === CurrentConsole){
                firebase.firestore().collection('Consoles').doc(e.id).delete()
            }
        })
        LoadConsolesData()
        
    }

    function Back(){
        if(PathRecord.pop()){
            SetCurrentGroup(PathRecord[PathRecord.length-1].Name)
            SetPathRecord(PathRecord)
        }
    }

  return (
    <div className='Console_Main_div'>

        <div className='Console_Select_div'>
            <div className='Current_Console'>
                <label>{CurrentConsole}</label>
            </div>
            <div className='Scroll_Content_div'>
                {Consoles.map((e,i)=>{
                    if(e.ConsoleName!=CurrentConsole){
                        return(
                            <label onClick={()=>{SetCurrentConsole(e.ConsoleName);SetCurrentGroup(e.ConsoleName);SetPathRecord([{Name:e.ConsoleName,Id:e.id}])}}>{e.ConsoleName}</label>
                        )
                    }
                })}
            </div>
            <div className='Create_div'>
                <button onClick={()=>{SetNewState("NewConsole")}}>Create</button>
                {NewState==="NewConsole"&&<NewConsole LoadConsolesData={LoadConsolesData} Index={Consoles.length-1} CancelFunction={SetNewState}/>}
            </div>
        </div>
        {/* --------------------------------------------- */}
        <div className='Console_Board_div'>
            <div className='Console_Search_Edit_div'>
                <div className='div1'>

                    {PathRecord.length>1&&<BsArrowLeftCircle className='Back_btn' onClick={Back} />}
                    <div className='Current_Group_div'>
                        <AiFillAppstore className='Icon'/>
                        <label>{CurrentGroup}</label>
                    </div>
                    {/* <IconTextButton Icon={<IoLink className='Icon'/>} text={"All Links"}/>
                    <IconTextButton Icon={<AiFillAppstore className='Icon'/>} text={"All Groups"}/> */}
                </div>
                <div className='Search_div'>
                    <input type={'text'} value={SearchText} onChange={(e)=>{SetSearchText(e.target.value)}}/>
                    {/* <button></button> */}
                </div>
                <div className='Add_div'>
                    <button onClick={()=>{SetNewState("NewGroupLink")}} >NEW</button>
                    {!EditMode&&<button onClick={()=>{SetEditMode(true)}} >EDIT</button>}
                    {EditMode&&<button onClick={()=>{SetEditMode(false)}} >DONE</button>}
                    <button onClick={DeleteConsole} >DELETE</button>
                    {NewState==="NewGroupLink"&&<NewOption PathRecord={PathRecord} LoadLinkAndGroupData={LoadLinkAndGroupData} CurrentConsole={CurrentConsole} ParentId={PathRecord[PathRecord.length-1].Id} ParentType={CurrentConsole===CurrentGroup} CancelFunction={SetNewState} CurrentPath={CurrentGroup} Index={Datas.length-1}/>}
                </div>
            </div>

            <div className='Display_Board_div'>
                {
                    Datas.map((e)=>{
                        if(e.Type==="Group"){
                            return <GroupCard Info={e} EditMode={EditMode} MoveElementIndex={MoveElementIndex} OpenGroup={OpenGroup} UpdateGroupOrLink={UpdateGroupOrLink} DeleteGroupOrLink={DeleteGroupOrLink}/>
                        }else if(e.Type==="Link"){
                            return <LinkCard Info={e} EditMode={EditMode} MoveElementIndex={MoveElementIndex} UpdateGroupOrLink={UpdateGroupOrLink} DeleteGroupOrLink={DeleteGroupOrLink}/>
                        }
                    })
                }
            </div>
        </div>
    </div>
  )
}

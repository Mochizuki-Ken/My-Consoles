import React from 'react'
import './IconTextButton.css'

export default function IconTextButton({Icon,text,OnClick}) {
  return (
    <div className='IconTextButton_Main_div' onClick={OnClick}>
        {Icon}
        <label>{text}</label>
    </div>
  )
}

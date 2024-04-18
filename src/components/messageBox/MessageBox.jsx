import React, { useState } from 'react'
import './MessageBox.css'
const MessageBox = (status, title, message) => {
    const [isOpen,setIsOpen] = useState(false);
    if(!isOpen)
        return null;
    else
    return (
        <div className='messageBox'>
            <div onClick={()=>setIsOpen(false)} className="closeBtn">X</div>
            <p>Tiêu đề lỗi</p>
            <p>Nội dung lỗi</p>
        </div>
    )
}

export default MessageBox
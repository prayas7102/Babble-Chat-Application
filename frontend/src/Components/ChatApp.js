import React, { useEffect, useState } from 'react'
import axios from "axios"

const ChatApp = () => {
  // const [first, setfirst] = useState('');
  // console.log(first)

  useEffect(() => {
    // axios.get("http://localhost:5000/chat/api")
    // .then((res)=>{
    //   console.log(res.data[0].chatName)
    //   setfirst(res.data[0].chatName)
    // })
  }, []);

  return (
    <div></div>
  )
}

export default ChatApp;
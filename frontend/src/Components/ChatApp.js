import React, { useEffect, useState } from 'react'
import axios from "axios"

const ChatApp = () => {
  const [first, setfirst] = useState('');
  // console.log(first)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/chat/api")
    .then((res)=>{
      setfirst(res.data[0].chatName)
    })
  }, []);

  return (
    <div>{first}</div>
  )
}

export default ChatApp;
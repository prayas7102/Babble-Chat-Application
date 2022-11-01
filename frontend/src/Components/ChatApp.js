import React, { useEffect, useState } from 'react'
import axios from "axios"

const ChatApp = () => {
  const [first, setfirst] = useState([]);
  console.log(first)

  useEffect(() => {
    axios.get("/chat/api")
    .then((res)=>{setfirst(res)})
  }, []);

  return (
    <div>l</div>
  )
}

export default ChatApp;
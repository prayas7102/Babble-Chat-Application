import React, { useEffect } from 'react'
import axios from "axios"

const ChatApp = () => {
  let data;
  const fetchChat = async () => {
    data = await axios.get("/chat/api"); 
    // http://127.0.0.1:5000  http://localhost:5000
    console.log(data)
  }
  useEffect(() => {
    fetchChat();
  }, data);

  return (
    <div>{data ? "data" : ""}</div>
  )
}

export default ChatApp
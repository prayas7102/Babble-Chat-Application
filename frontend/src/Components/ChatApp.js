import React, {useEffect} from 'react'
import axios from "axios"

const ChatApp = () => {
  let data;
  const fetchChat=async()=>{
    data=await axios.get("chat/api");
    console.log(data)
  }
  useEffect(() => {
    fetchChat();
  },);
  
  return (
    <div>{data?data:""}</div>
  )
}

export default ChatApp
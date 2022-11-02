import React, { useEffect, useState } from 'react'
import axios from "axios"

const ChatApp = () => {
  const [first, setfirst] = useState([]);
  console.log(first)

  useEffect(() => {
    fetch("/chat/api")
    .then((res)=>{
      setfirst(res)
    })
  }, []);
// {first[0].users[0].name}
  return (
    <div>mm</div>
  )
}

export default ChatApp;
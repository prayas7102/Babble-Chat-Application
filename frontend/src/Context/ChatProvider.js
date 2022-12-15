import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatState=()=>{
    return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        const useInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(useInfo);
        if(!useInfo) navigate('/');
    }, [navigate]);

    return (
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Homepage from './Components/Homepage';
import ChatApp from './Components/ChatApp';

function App() {
  return (
    <ChakraProvider>
      <Homepage />
      <ChatApp/>
    </ChakraProvider>
  )
}
export default App;

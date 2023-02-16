import {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabPanels, TabPanel, TabList, Container, Box, Text } from '@chakra-ui/react'
import Login from "../Components/Authentication/Login"
import SignUp from "../Components/Authentication/SignUp"

const Homepage = () => {
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const useInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(useInfo);
    if (useInfo) navigate('/chat');
  }, [navigate]);

  return (
      <Container maxW="xl" >
        <Box
          d="flex"
          justifyContent="center"
          textAlign="center"
          p={3}
          bg="white"
          w="100%"
          m="10px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            Babble
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">s
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
  )
}

export default Homepage
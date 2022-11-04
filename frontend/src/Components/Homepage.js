import React from 'react'
import { Button, Container, Box, Text } from '@chakra-ui/react'

const Homepage = () => {
  return (
    <div>
      <Container>
        <Box
          d='flex' justifyContent="center" p={3} bg={"white"}
          w="100%" m="40px 0 15px 0"
          borderRadius="lg" borderWidth="1px"
        >
          <Text> Baat Karega?</Text>
        </Box>
        <Button colorScheme='blue'>Button</Button>
      </Container>
    </div>
  )
}

export default Homepage
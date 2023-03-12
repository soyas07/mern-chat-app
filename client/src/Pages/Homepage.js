import { 
    Box, 
    Container, 
    Text, 
    Tab, 
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const Homepage = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box
                d='flex'
                justifyContent='center'    
                p={3}
                w="100%"
                bg='white'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth="1px"
            >
                <Text
                    fontSize="4xl"
                    fontFamily="Work sans"
                    color="black"
                    align="center"
                >Lit-Chat-App</Text>
            </Box>
            <Box
                bg='white'
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                color='black'
            >
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList mb='1em'>
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage
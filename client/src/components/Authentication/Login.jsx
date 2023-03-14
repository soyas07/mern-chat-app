import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const inputFields = [
        {
            id: 'email',
            formLabel: 'Email',
            placeholder: 'Enter Your Email',
            name: 'email'
        },
        {
            id: 'password',
            formLabel: 'Password',
            placeholder: 'Enter Your Password',
            name: 'password'
        },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }

    const handleClick = (e) => {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type":"application/json"
                },
            };

            const { data } = await axios.post("/api/user/login", { email, password }, config);
            toast({
                title: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    }

    return (
        <VStack spacing='5px'>
            {inputFields.map((field) => {
                if (field.name === 'password') {
                    return (
                        <FormControl id={field.id} isRequired>
                            <FormLabel>{field.formLabel}</FormLabel>
                            <InputGroup>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    name={field.name}
                                    value={password}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    )
                }

                return (
                    <FormControl id={field.id} isRequired>
                        <FormLabel>{field.formLabel}</FormLabel>
                        <Input
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            name={field.name}
                            value={email}
                        />
                    </FormControl>
                )
            })}

            <Button 
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Login</Button>

            <Button 
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail('guest@example.com');
                    setPassword('123456');
                }}
            >Get Guest User Credentials</Button>
        </VStack>
    )
}

export default Login
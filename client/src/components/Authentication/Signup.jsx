import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const inputFields = [
        {
            id: 'first-name',
            formLabel: 'Name',
            placeholder: 'Enter Your Name',
            name: 'first-name'
        },
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
        {
            id: 'confirmpassword',
            formLabel: 'Confirm Password',
            placeholder: 'Confirm Password',
            name: 'confirmpassword'
        },
        {
            id: 'pic',
            formLabel: 'Upload Your Picture',
            name: 'file'
        }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'first-name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmpassword':
                setconfirmpassword(value);
                break;
            case 'file':
                setPic(e.target.files[0]);
                break;
        }
    }

    const handleClick = (e) => {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
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

        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do not match!",
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

            const { data } = await axios.post("/api/user", { name, email, password, pic}, config);
            toast({
                title: "Registration Successful!",
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

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'lit-chat-app');
            data.append('cloud_name', 'djbmkfil6');
            fetch('https://api.cloudinary.com/v1_1/djbmkfil6/image/upload', {
                method: "POST",
                body: data,
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    }

    return (
        <VStack spacing='5px'>
            {inputFields.map((field) => {
                if (field.name === 'password' || field.name === 'confirmpassword') {
                    return (
                        <FormControl id={field.id} isRequired>
                            <FormLabel>{field.formLabel}</FormLabel>
                            <InputGroup>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    name={field.name}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    )
                } else if (field.name === "file") {
                    return (
                        <FormControl id={field.id} isRequired>
                            <FormLabel>{field.formLabel}</FormLabel>
                            <Input
                                type="file"
                                p={1.5}
                                accept="image/*"
                                onChange={e => postDetails(e.target.files[0])}
                                name={field.name}
                            />
                        </FormControl>
                    )
                } else {
                    return (
                        <FormControl id={field.id} isRequired>
                            <FormLabel>{field.formLabel}</FormLabel>
                            <Input
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                name={field.name}
                            />
                        </FormControl>
                    )
                }
            })}

            <Button 
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Sign Up</Button>
        </VStack>
    )
}

export default Signup
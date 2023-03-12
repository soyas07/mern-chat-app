import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [pic, setPic] = useState('');

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
            case 'file':
                setPic(e.target.files[0]);
                break;
        }
    }

    const handleClick = (e) => {
        setShow(!show);
    }

    const submitHandler = () => {
        
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
                                onChange={handleChange}
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
            >Sign Up</Button>
        </VStack>
    )
}

export default Signup
import React, { useState } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const submitHandler = () => {
        
    }

    return (
        <VStack spacing='5px'>
            {inputFields.map((field) => {
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
            })}

            <Button 
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >Sign Up</Button>

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
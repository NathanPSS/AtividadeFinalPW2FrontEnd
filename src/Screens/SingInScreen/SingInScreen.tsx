import { flexbox } from '@chakra-ui/react'
import { Box, Button, TextField, Typography } from '@mui/material'
import img from '../../assets/Rectangle 6.png'
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { createBrowserHistory } from 'history';


export default function SignInScreen() {
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Email incorreto').required('Email é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
      // Add more validation rules for other fields if needed
    });
  
    const history = createBrowserHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      // Update the corresponding state and perform validation
      if (name === 'email') {
        setEmail(value)
      } else if (name === 'password') {
        setPassword(value)
      } else if(name === 'name'){
         setName(value)
      } else if (name == 'lastName'){
         setLastName(value)
      }
  
      validationSchema
        .validateAt(name, { [name]: value })
        .then(() => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        })
        .catch((error) => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
        });
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
        
         
          const response = await axios.post('http://localhost:3000/user', {
            email,
            password,
            name,
            lastName,
       
          });
    
          
          console.log('Form submitted successfully', response.data);
         history.push('/login')
       window.location.href = '/login';
        
        } catch (error) {
       
          console.error('Error submitting form', error);
         
        }
      };


 
    return (
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: '#EAEAEA',
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <Box display="flex" flexDirection="row" margin={'10vh'}>
          <Box>
            <img src={img} alt="Logo" />
          </Box>
          <Box
            sx={{
              width: '50vh',
              height: '62vh',
              backgroundColor: 'white',
              marginLeft: '35vh',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.4)',
              borderRadius: '2vh',
            }}
          >
            <Box margin="5vh" display="flex">
              <Typography fontSize="5vh" variant="h3">
                Cadastro
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flexDirection: 'column',
                width: '40vh',
                display: 'flex',
                marginLeft: '5vh',
                alignItems: 'center',
                gap: '3vh',
              }}
            >
              <TextField
                value={email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                name="email"
                autoFocus
                color="primary"
                label="Email"
                variant="outlined"
                sx={{ width: '100%' }}
              />
                 <TextField
                value={password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                name="password"
                type="password"
                color="primary"
                label="Senha"
                variant="outlined"
                sx={{ width: '100%' }}
              />
               <TextField
                 onChange={handleChange}
                name="name"
                autoFocus
                color="primary"
                label="Nome"
                variant="outlined"
                sx={{ width: '100%' }}
              />
               <TextField
             
             onChange={handleChange}
             
                name="lastName"
                autoFocus
                color="primary"
                label="Sobrenome"
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                sx={{
                 
                  width: '80%',
                  borderRadius: '2vh',
                  bgcolor: '#A82071',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#E54291',
                  },
                }}
              >
                <Typography fontSize="2vh">Cadastrar</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
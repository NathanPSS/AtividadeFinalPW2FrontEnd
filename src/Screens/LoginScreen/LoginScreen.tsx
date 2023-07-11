import { Box, Button, TextField, Typography } from '@mui/material';
import img from '../../assets/Rectangle 6(1).png';
import { createBrowserHistory } from 'history';
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as Yup from 'yup';

export default function LoginScreen() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email incorreto').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const history = createBrowserHistory();
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
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
    const username = email;
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
       setToken(response.data.token)
  
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  useEffect(() => {
    
    if (token) {

       window.location.href = '/timeline';
    }
  }, [token]);

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
          <img src={img} alt="logo" />
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
              Entrar
            </Typography>
          </Box>
          <Box
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                marginTop: '19vh',
                width: '80%',
                borderRadius: '2vh',
                bgcolor: '#A82071',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#E54291',
                },
              }}
            >
              <Typography fontSize={'2vh'}>Entrar</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
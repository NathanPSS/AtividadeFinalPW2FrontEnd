import { Autocomplete, Avatar, Box, Button, ButtonBase, FilledInput, Icon, IconButton, Input, InputBase, SvgIcon, SvgIconProps, TextField, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";
import { themeGray } from "../../themes/themeGray";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup'
import pdfImg from '../../assets/pdf.png'
import axios from "axios";


export default function EditProfile(){
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [user,setUser] =useState<Object>({})
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click()

  };
  const getUser = async () =>{
    const response = await axios.get('http://localhost:3000/user',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) =>{
      console.log(response.data)
      setUser(response.data)
    
    })
    .catch((error) => console.log(error))
  }
  
  useEffect(() =>{
    getUser()
   
  },[])
 

  const handleFileChange = (event :any) => {
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current.files?.[0];
      setSelectedFile(file);
     
      
      const reader = new FileReader();

      if(file.type === 'application/pdf'){
        setImagePreviewUrl(pdfImg)
      } else {
      reader.onload = (e) => {
        setImagePreviewUrl(e.target?.result as string);
      };
    }
      reader.readAsDataURL(file);
    }
  };
 
 
  const [formValues, setFormValues] = useState({
     bio:"",
          phone:"",
          email:"",
          name:"",
          linkGithub:"",
  });
  useEffect(() =>{
  
    setImagePreviewUrl(user.profile?.firebaseUrlFile ? user.profile.firebaseUrlFile : null)
    setFormValues({
      bio:user.bio ? user.bio : "",
      phone:user.phone ? user.phone : "",
      email:user.email ? user.email : "",
      name:user.name ? user.name : "",
      linkGithub:user.github ? user.github : "",
    })
  },[user])
  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
  
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});
      
      
   
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      formData.append("bio", formValues.bio);
      formData.append("github", formValues.linkGithub);

      formData.append("file", selectedFile);
      const response = await axios.patch('http://localhost:3000/user',formData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          "Content-Type":'multipart/form-data'
        },
      }).then(() =>{
        setFormValues({
          bio:"",
          phone:"",
          email:"",
          name:"",
          linkGithub:"",
      
        })
        setSelectedFile(null)
        window.location.href = '/timeline'
      })
      .catch((error) => console.log(error))
      
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setFormErrors(errors);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
  };

  const handleChange = (event) => {
   
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

  };
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImageSrc(null);
    }
  }, [selectedFile]);
    return(
        <Box sx={{
            position:'absolute',
            backgroundColor:'black',
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            overflowY:'auto'
           }}>
         
           <Box sx={{
            height:'100%',
            width:'30%'
           }}>
            <Box display={'flex'} justifyContent='center' marginTop={'2vh'}>
              <ButtonBase onClick={handleButtonClick}>
            <Avatar src={imagePreviewUrl} style={{width:'25vh',height:'25vh'}}></Avatar>
            </ButtonBase>
            </Box>
          
           <Box sx={{
        
            
           }}>
            
            <Box component='form' display='flex' flexDirection='column' gap={'5vh'} marginTop={'5vh'}>
            <ThemeProvider theme={themeGray}>
            <TextField
          color="primary"
          label="Nome"
   
          variant="standard"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
            <TextField
          color="primary"

          label="Email"
         
          variant="standard"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
              
              <TextField
          color="primary"
       
          label="Contato"
     
          variant="standard"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />
               <TextField
          color="primary"
          multiline
          label="Bio"
        
          variant="standard"
          name="bio"
          value={formValues.bio}
          onChange={handleChange}
          error={!!formErrors.bio}
          helperText={formErrors.bio}
        />
                 <TextField
          color="primary"
      
          label="Link Github"
    
          variant="standard"
          name="linkGithub"
          value={formValues.linkGithub}
          onChange={handleChange}
          error={!!formErrors.linkGithub}
          helperText={formErrors.linkGithub}
        />
          
         
         <Box sx={{
           height:'20vh',
           display:'flex',
           gap:'4vh',
           justifyContent:'end'
         }}>
          
                 <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
       
        
         <Button onClick={handleSubmit} sx={{
          textTransform:'none', height:'30%',width:'15vh',fontSize:'2vh'
          
          }} variant='contained' color='warning'>Salvar</Button>
         </Box>
            </ThemeProvider>
            
            </Box>
           </Box>
           </Box>
           </Box>
    )
}

  
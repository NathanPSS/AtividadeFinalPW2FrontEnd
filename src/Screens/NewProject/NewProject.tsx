import { Autocomplete, Box, Button, ButtonBase, FilledInput, Icon, IconButton, Input, InputBase, SvgIcon, SvgIconProps, TextField, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";
import { themeGray } from "../../themes/themeGray";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup'
import pdfImg from '../../assets/pdf.png'
import axios from "axios";


export default function NewProject(){
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [users,setUsers] =useState([])
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click()

  };
  const getUsers = async () =>{
    const response = await axios.get('http://localhost:3000/user/all',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) =>{
    
      setUsers(response.data)
    })
    .catch((error) => console.log(error))
  }
  useEffect(() =>{
    getUsers()
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
  const getFileNameWithoutExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };
 
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    gpWhatsapp: "",
    linkPrototipo: "",
    linkGithub: "",
   
  });

  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Titulo é obrigatório"),
    description: Yup.string().required("Descrição é obrigatória"),
    collaborators: Yup.array(),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});
      
      
   
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("gpWhatzap", formValues.gpWhatsapp);
      formData.append("prototype", formValues.linkPrototipo);
      formData.append("github", formValues.linkGithub);

      formData.append("file", selectedFile);
      const response = await axios.post('http://localhost:3000/project',formData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          "Content-Type":'multipart/form-data'
        },
      }).then(() =>{
        setFormValues({
          title:'',
          description:'',
          gpWhatsapp:'',
          linkGithub:'',
          linkPrototipo:'',
      
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
    return(
        <Box sx={{
            position:'absolute',
            backgroundColor:'black',
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center'
           }}>
           <Box sx={{
            height:'100%',
            width:'30%'
           }}>
           <Box sx={{
           
           }}>
            <Typography marginTop={'5vh'} color='white' variant='h2'>Novo Projeto</Typography>
            <Box component='form' display='flex' flexDirection='column' gap={'5vh'} marginTop={'5vh'}>
            <ThemeProvider theme={themeGray}>
            <TextField
          color="primary"
          label="Titulo"
          required
          variant="standard"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          error={!!formErrors.title}
          helperText={formErrors.title}
        />
            <TextField
          color="primary"
          multiline
          label="Descrição"
          required
          variant="standard"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          error={!!formErrors.description}
          helperText={formErrors.description}
        />
              
              <TextField
          color="primary"
          multiline
          label="Link GP Whatzap"
          required
          variant="standard"
          name="gpWhatsapp"
          value={formValues.gpWhatsapp}
          onChange={handleChange}
          error={!!formErrors.gpWhatsapp}
          helperText={formErrors.gpWhatsapp}
        />
               <TextField
          color="primary"
          multiline
          label="Link Prototipo"
          required
          variant="standard"
          name="linkPrototipo"
          value={formValues.linkPrototipo}
          onChange={handleChange}
          error={!!formErrors.linkPrototipo}
          helperText={formErrors.linkPrototipo}
        />
                 <TextField
          color="primary"
          multiline
          label="Link Github"
          required
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
           flexDirection:'row',
           gap:'4vh'
         }}>
            <ThemeProvider theme={createTheme({
                palette:{
                    secondary:{
                        main:'#808080'
                    }
                },
                components:{
                    MuiButton:{
                        styleOverrides:{
                            root:{
                                backgroundColor:'#3D3D3D',
                                borderColor:'#3D3D3D',
                                height:'10vh',
                                width:'10vh',
                                '&:hover':{
                                    backgroundColor:'#CCCCCC',
                                    borderColor:'#CCCCCC',
                                }
                            }
                        }
                    },
                    MuiSvgIcon:{
                        styleOverrides:{
                            root:{
                               fontSize:'5vh'
                            },
                            
                        }
                    }
                }
            })}>
                 <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
             {selectedFile && (
        <Box display='flex' flexDirection={'column'} justifyContent='center' width='10vh' height='10vh'>
          {imagePreviewUrl && <img style={{marginLeft:'3vh', width:'8vh',height:'8vh'}} src={imagePreviewUrl} alt="Selected file" />}
          <p>{getFileNameWithoutExtension(selectedFile.name)}</p>
        </Box>
      )}
         <Button variant='outlined' color='primary' onClick={handleButtonClick}  size='large'>
            <AddIcon   color='secondary' />
         </Button>
         </ThemeProvider>
         <Button onClick={handleSubmit} sx={{
          left:'15vh',textTransform:'none', height:'30%',width:'15vh',fontSize:'2vh'
          
          }} variant='contained' color='success'>Criar</Button>
         </Box>
            </ThemeProvider>
            
            </Box>
           </Box>
           </Box>
           </Box>
    )
}

  
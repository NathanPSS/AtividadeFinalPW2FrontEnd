import { Autocomplete, Avatar, Box, Button, ButtonBase, FilledInput, Icon, IconButton, Input, InputBase, SvgIcon, SvgIconProps, TextField, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";
import { themeGray } from "../../themes/themeGray";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup'
import pdfImg from '../../assets/pdf.png'
import axios from "axios";


export default function EditProject() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [project,setProject] =useState<Object>({})
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  };

  const getUser = async () => {

    const response = await axios.get(`http://localhost:3000/project/${window.location.pathname.slice(13)}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      console.log(response.data)
      setProject(response.data)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleFileChange = (event :any) => {
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current.files?.[0];
      setSelectedFile(file);

      const reader = new FileReader();

      if (file.type === 'application/pdf') {
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
    title: "",
    description: "",
    prototype: "",
    linkGithub: "",
    gpWhatzap: ""
  });

  useEffect(() => {
    setSelectedFile(project.attachment?.firebaseUrlFile ? project.attachment?.firebaseUrlFile : null)
    setFormValues({
      description: project.description ? project.description : "",
      title: project.title ? project.title : "",
      prototype: project.prototype ? project.prototype : "",
      linkGithub: project.github ? project.github : "",
      gpWhatzap: project.gpWhatzap ? project.gpWhatzap : ""
    })
  }, [project]);

  const [formErrors, setFormErrors] = useState({});

  const validationSchema = Yup.object().shape({
    // Define your validation schema here
  });

  const getFileNameWithoutExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName;
    }
    return fileName.substring(0, lastDotIndex);
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});

      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("gpWhatzap", formValues.gpWhatzap);
      formData.append("prototype", formValues.prototype);
      formData.append("github", formValues.linkGithub);

      formData.append("file", selectedFile);

      const response = await axios.patch(`http://localhost:3000/project/${window.location.pathname.slice(13)}`, formData, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'multipart/form-data'
        },
      })
      .then(() => {
        setFormValues({
          description: "",
          title: "",
          gpWhatzap: "",
          linkGithub: "",
          prototype: ""
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

 

  return (
    <ThemeProvider theme={themeGray}>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: 'black',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <Box sx={{
          height: '100%',
          width: '30%'
        }}>
          <Box sx={{
          }}>
            <Box component='form' display='flex' flexDirection='column' gap={'5vh'} marginTop={'5vh'}>
              <TextField
                color="primary"
                label="Titulo"
                variant="standard"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
              <TextField
                color="primary"
                label="Descrição"
                variant="standard"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
              <TextField
                color="primary"
                label="Link Prototipo"
                variant="standard"
                name="prototype"
                value={formValues.prototype}
                onChange={handleChange}
                error={!!formErrors.prototype}
                helperText={formErrors.prototype}
              />
              <TextField
                color="primary"
                multiline
                label="Link GP Whatzap"
                variant="standard"
                name="gpWhatzap"
                value={formValues.gpWhatzap}
                onChange={handleChange}
                error={!!formErrors.gpWhatsapp}
                helperText={formErrors.gpWhatsapp}
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
                height: '10vh',
                display: 'flex',
                gap: '4vh',
                justifyContent: 'start'
              }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <Box display='flex' flexDirection={'column'} justifyContent='center' width='10vh' height='10vh'>
                    {imagePreviewUrl && <img style={{marginLeft:'3vh', width:'8vh',height:'8vh'}} src={imagePreviewUrl} alt="Selected file" />}
                  
                  </Box>
                )}
                <Button variant='outlined' color='primary' onClick={handleButtonClick}  size={'large'}>
                  <AddIcon color='secondary' />
                </Button>
                <Button onClick={handleSubmit} sx={{
                  left:'15vh',textTransform:'none', height:'50%',width:'20%',fontSize:'2vh'
                }} variant='contained' color='warning'>Salvar</Button>
              </Box>
            </Box>
          </Box>
    
        </Box>
      </Box>
    </ThemeProvider>
  );
}
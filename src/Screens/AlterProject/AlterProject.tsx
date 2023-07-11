import { Autocomplete, Box, Button, ButtonBase, FilledInput, Icon, IconButton, Input, InputBase, SvgIcon, SvgIconProps, TextField, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";
import { themeGray } from "../../themes/themeGray";
import AddIcon from '@mui/icons-material/Add';
import incon from '../../assets/Rectangle 21.png'
import { useRef, useState } from "react";
import pdfImg from '../../assets/pdf.png'


export default function AlterProject(){
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click()

  };

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
            <Box display='flex' flexDirection='column' gap={'5vh'} marginTop={'5vh'}>
            <ThemeProvider theme={themeGray}>
            <TextField color='primary' label='Titulo' required variant='standard'  />
            <TextField multiline color='primary' label='Descrição' required variant='standard'/>
         
              
            <TextField color='primary' label='GP Whatzapp'  variant='standard'  />
            <TextField color='primary' label='Link Prototipo'  variant='standard'  />
            <TextField color='primary' label='Link Github'  variant='standard'  />
            <Autocomplete
        multiple
        id="tags-standard"
        options={[{title:'dasdasda'},{title:'sdasdas'},{title:'dsadasdasww2'}]}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Colaboradores"
          
          />
        )}
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
         </Box>
            </ThemeProvider>
            </Box>
           </Box>
           </Box>
           </Box>
    )
}

  
import { createTheme } from "@mui/material";

export const themeGray = createTheme({
    palette: {
        primary: {
          main: '#FFFFFF',
        },
        text: {
          primary: '#FFFFFF', // Customize the text color when not selected
        },
      },
      components:{
        MuiFormLabel:{
            styleOverrides:{
                root:{
                    color:'#8C8C8C',
                    borderColor:'#8C8C8C'
                }
            }
        },
        MuiInputBase:{
            styleOverrides:{
                root:{
                    borderColor:'#8C8C8C',
                    borderBottomWidth:'2px'
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    borderColor:'white',
                    borderBottomWidth:'2px'
                }
            }
        },
        MuiAutocomplete:{
            styleOverrides:{
               paper:{
                backgroundColor:'black',  
    
               },
              option:{
                '&:hover':{
                    backgroundColor:'#8C8C8C',
                },
              }
            },
        },
        MuiChip:{
            styleOverrides:{
                root:{
                    backgroundColor:'#3D3D3D'
                }
            }
        }
      }
    });
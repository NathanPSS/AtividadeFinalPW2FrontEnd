import { Box, Button, Typography } from "@mui/material";
import img from '../../assets/3054605.jpg'


export default function DashboardScreen() {
const handleCadastro = () =>{
    window.location.href = '/cadastro'
}
const handleLogin= () =>{
    window.location.href = '/login'
}



    return(
        <Box sx={{
            position:'absolute',
            backgroundColor:'white',
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            overflowY:'scroll'
         }}>
         <Box
         sx={{
            display:'flex',
            flexDirection:'row'
        
         }}
         >

            <img style={{
                width:'50%',
                height:'100%',
            }} src={img}></img>
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                marginTop:'30vh',
                height:'100%'
            }}
            >   
            <Box
            sx={{
                display:'flex',
                flexDirection:'row'
            }}
            >
            <Typography variant="h2" >Bem Vindo ao </Typography>
            <Typography variant="h2" sx={{marginLeft:'2vh',color:'#269E36'}}>Colab Projects</Typography>
            </Box>
            <Typography variant="h2">Onde sua Ideia se Torna Realidade</Typography>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                width:'100%',
                height:'100%',
                marginTop:'5vh',
                gap:'5vh'
            }}
            >
            <Button
            onClick={handleCadastro}
            variant='contained'
            sx={{
                height:'5%',
                width:'10%',
                backgroundColor:'#A82071',
                textTransform:'none',
                '&:hover': {
                    backgroundColor: '#E54291',
                  },
            }}
            >Cadastro</Button>
            <Button
            onClick={handleLogin}
            variant='contained'
            sx={{
                height:'5%',
                width:'10%',
                backgroundColor:'#A82071',
                textTransform:'none',
                '&:hover': {
                    backgroundColor: '#E54291',
                  },
            }}
            >Login</Button>  
            </Box>
           
            </Box>
        
        
         </Box>
         </Box>
    )
}
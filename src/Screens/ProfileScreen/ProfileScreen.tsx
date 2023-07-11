import { Avatar, Box, Button, Grid, Stack } from '@mui/material'
import './profileScreen.css'
import ProfileText from '../../components/ProfileText/ProfileText'
import ProjectTimeline from '../../components/ProjectTimeline/ProjectTimeline'
import { position } from '@chakra-ui/react'

export default function ProfileScreen(){
    return(
    <>
        
        <Grid container spacing={2} >
      <Grid item xs={12} sm={6} md={4}>
    <Box position='absolute' display='flex' flexDirection='row' height={'100%'}>
      <Box
      sx={{
        borderRightWidth:'1px',
        borderRightColor:'#FFFFFF',
        width:'70vh',
        display:'flex',
        flexDirection:'row',
        height:'100%'
      }}
      >
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            margin:'5vh',
            width:'65vh',
         
        }} >
            <Avatar sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                width:'24vh',
                height:'24vh'
            }} />
          <Box>
            <ProfileText title='Nome' content='Rodigro Faro Silva'/>
            <ProfileText title='Email' content='rodigrofaro@gmail.com'/>
          </Box>
          <Box sx={{

          }}>
          </Box>
        </Box>
      </Box>
    
    </Box>
    </Grid>
    </Grid>
    <Grid container spacing={2} marginLeft={70}>
      <Grid item xs={12} sm={6} md={8}>
    <Box  sx={{
        marginTop:'2vh',
        right:'10vh',
        width:'90vh',
        display:'flex',
        height:'100%',
        position:'absolute'
      }}>
       <ProjectTimeline avatar={false} sx={{
        width:'80vh',
        height:'20vh',
        position:'relative',
        backgroundColor:'black',
        borderColor:'white',
        borderWidth:'2px'
    }} />
    </Box>
    </Grid>
    </Grid>
    </>
    )
}
 

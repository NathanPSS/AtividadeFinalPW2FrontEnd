import { Avatar, Box, Button, Grid, Stack } from '@mui/material'
import './profileScreen.css'
import ProfileText from '../../components/ProfileText/ProfileText'
import ProjectTimeline from '../../components/ProjectTimeline/ProjectTimeline'
import { position } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'






export default function ProfileScreen(){
  const[user,setUser] = useState({})
  const [imagePreviewUrlProfile, setImagePreviewUrlProfile] = useState<string | null>(null);

const getUserInfo =async () =>{
  const response = await axios.get('http://localhost:3000/user',{
   headers:{
     Authorization:`Bearer ${localStorage.getItem('token')}`
   }
  })
  .then(response =>{
   setUser(response.data)
   console.log(response.data)
  })
}
useEffect(() =>{
    
  setImagePreviewUrlProfile(user.profile?.firebaseUrlFile ? user.profile.firebaseUrlFile : null)

},[user])

  useEffect(() =>{
     getUserInfo()
  },[])
    return(
    
          <Box sx={{
            position:'absolute',
            backgroundColor:'black',
            display:'flex',
            width:'100%',
            height:'100%',
            justifyContent:'center',
            overflowY:'scroll'
         }}>
    <Box position='relative' display='flex' flexDirection='row' height={'100%'}>
      <Box
      sx={{
       alignSelf:'center',
       alignContent:'center',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        height:'100%'
      }}
      >
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            margin:'5vh',
            width:'100%',
         
        }} >
            <Avatar 
            src={imagePreviewUrlProfile}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                width:'24vh',
                height:'24vh'
            }} />
          <Box
          sx={{
            width:'100%'
          }}
          >
            <ProfileText title='Nome' content={user.name}/>
            <ProfileText title='Sobrenome' content={user.lastName}/>
            <ProfileText title='Contato' content={user.phone}/>
            <ProfileText title='GitHub' content={user.github}/>
            <ProfileText title='Bio' content={user.bio}/>
          </Box>
          <Box sx={{

          }}>
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
    )
}


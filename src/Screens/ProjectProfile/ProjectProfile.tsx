import { useSafeLayoutEffect } from "@chakra-ui/react";
import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";




export default function ProjectProfile(){
    const [projectReponse,setProjectResponse] = useState({})
    const [project,setProject] = useState({})
     const [imagePreviewUrlProfile, setImagePreviewUrlProfile] = useState<string | null>(null);
   

    const getProjectData = () =>{
        console.log(window.location.pathname)
        const response = axios.get(`http://localhost:3000/project/${window.location.pathname.slice(16)}`)
        .then((response) =>{
       
            setProjectResponse(response.data)
        })
    }

    useEffect(() =>{
       getProjectData()
    },[])
    
 useEffect(() =>{
    console.log(projectReponse)
   setProject(projectReponse)
 },[projectReponse])

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
           <Box sx={{
            height:'100%',
            width:'30%'
           }}>
            <Typography marginTop={'5vh'} color={'white'} variant="h2" fontWeight={'bold'}>{project.title}</Typography>
            <Box marginTop={'5vh'} gap={'2vh'} display={'flex'} flexDirection={'column'}>
            <Box display='flex' flexDirection={'column'}>
            <Box display='flex' flexDirection={'column'} gap={'1vh'}>
                 <Typography  fontSize={'1.5vh'} color={'#8C8C8C'}>Descrição</Typography>
                <Typography fontSize={'3vh'} color={'white'}>{project.description}</Typography>
            {project.gpWhatzap ?   
            <Box>
                 <Typography  fontSize={'1.5vh'} color={'#8C8C8C'}>Link Grupo Whatzap</Typography>
                <Link fontSize={'3vh'} href={project.gpWhatzap}>{project.gpWhatzap}</Link>
            </Box> : null }
            {project.github ? 
          <Box display='flex' flexDirection={'column'}>
          <Typography  fontSize={'1.5vh'} color={'#8C8C8C'}>Link Github</Typography>
         <Link fontSize={'3vh'} href={project.github}>{project.github}</Link>
     </Box>    
        :null}
           {project.prototype ? 
            <Box display='flex' flexDirection={'column'}>
            <Typography  fontSize={'1.5vh'} color={'#8C8C8C'}>Link Prototipo</Typography>
           <Link fontSize={'3vh'} href={project.prototype}>{project.prototype}</Link>
       </Box>:null}
      {project.attachment?.firebaseUrlFile? 
     <Box >
         <Typography  fontSize={'1.5vh'} color={'#8C8C8C'}>Anexo</Typography>
        <Link  fontSize={'3vh'} href={project.attachment.firebaseUrlFile}><img style={{
            width:'10vh',
            height:'10vh'
        }} src={project.attachment.firebaseUrlFile} /></Link>
      </Box>
     :null}
      
            </Box>
           </Box>
         </Box>
         </Box>
         </Box>
    )
}
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import ProjectTimeline from "../ProjectTimeline/ProjectTimeline";
import { useEffect } from "react";


interface IProps {
  projects: Array<any>
  fuctionEdit : Function
  fuctionDelete :Function
}

export default function ProjectsDrawer(props :IProps) {
  useEffect(() =>{
  
  },[props.projects])
    return(
    <Box bgcolor='black'
    width={'40vh'}
    height={'100%'}
    left={'40vh'}
    display='flex'
    position='fixed'
    zIndex={9999}
    flexDirection='column'
    sx={{
      overflowY:'scroll'
    }}
    >
       
<Typography marginTop={'1vh'} color='white' variant='h4' fontWeight='bold'>Meus Projetos</Typography>
{props.projects.map((item) => {
  return(

      <Box
      key={item.id}
      sx={{
        borderWidth:'1px',
        borderColor:'white',
        margin:'2vh',
        height:'25vh',
        display:'flex',
        flexDirection:'column'
      }}
      >
        <ProjectTimeline 
        avatar={false}    
        key={item.id}
        title={item.title}
        titleAuthor=""
        description={item.description}
        sx={{
          width:'35vh',
          backgroundColor:'black',
          maxHeight:'20vh',
          marginTop:'2vh',
      }}/>
    
        <Box marginTop={'2vh'} display='flex' justifyContent='space-between' marginRight={'2vh'} marginLeft={'2vh'} marginBottom={'2vh'}>
    <Button variant='contained' color='warning' onClick={() =>{props.fuctionEdit(item.id)}}>Editar</Button>
    <Button variant='contained' color='error' onClick={() =>{props.fuctionDelete(item.id)}}>Deletar</Button>
    </Box>
    </Box>

  )
})}
    </Box>
    )
}
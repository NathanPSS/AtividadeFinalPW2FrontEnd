import { Avatar, Box, ButtonBase, Grid } from '@mui/material'
import CreateProjectButton from '../../components/CreateProjectButton/CreateProjectButton'
import Panel from '../../components/Panel/Panel'
import './baseTimeline.css'
import ProjectTimeline from '../../components/ProjectTimeline/ProjectTimeline'
import { DrawerConfig } from '../../components/DrawerConfig/DrawerConfig'
import { useEffect, useState } from 'react'
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal'
import ProjectsDrawer from '../../components/ProjectsDrawer/ProjectsDrawer'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'




export default function BaseScreenTimeline(){
  const[user,setUser] = useState({})
  const[projectTimeline,setProjectTimeline] = useState([])
  const [imagePreviewUrlProfile, setImagePreviewUrlProfile] = useState<string | null>(null);
  const [projectProfile,setProjectProfile] = useState([])
  const getUserInfo =async () =>{
     const response = await axios.get('http://localhost:3000/user',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
     })
     .then(response =>{
      setUser(response.data)
     })
  }
  const getProjectTimeline =async () =>{
   await axios.get('http://localhost:3000/project',{
     
    })
    .then(response =>{
     
     setProjectTimeline(response.data)
    })
 }
 
 
  useEffect(() =>{
    getUserInfo()
    getProjectTimeline()
  },[])

  useEffect(() =>{
    
    setImagePreviewUrlProfile(user.profile?.firebaseUrlFile ? user.profile.firebaseUrlFile : null)
  
    setProjectProfile(projectTimeline.filter((project) => project.author.id === user.id))
  },[user,projectTimeline,])

  const [isVisible,setVisible] = useState(false)
   
  const toggleVisibility = () => {
   setVisible(!isVisible);
 };
 const [isVisibleProjects,setVisibleProjects] = useState(false)
   
  const toggleVisibilityProjects = () => {
   setVisibleProjects(!isVisibleProjects);
 };

 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 
 const signout = () =>{
  localStorage.removeItem('token')
  window.location.href = '/login'
 }


 const detailsProject = (id) => {
      window.location.href = `/projectProfile/${id}`
 }
 const deleteProject = (id) => {
  axios.delete(`http://localhost:3000/project/${id}`).then(() =>{window.location.reload()})
 }
 const deleteAccount = () => {

  axios.delete(`http://localhost:3000/user`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }).then(() =>{
    signout()})
 }
const editProject = (id) =>{
  window.location.href = `/editProject/${id}`
}


    return(
        <>
     <Box sx={{
        position:'absolute',
        backgroundColor:'black',
        display:'flex',
        width:'100%',
        height:'100%',
        overflowY:'scroll'
     }}>
    <Grid container spacing={2} width={'100vh'}>
      <Grid item xs={12} sm={6} md={4} >
      
         
        <div className='panel' style={{position:'fixed'}}>
        <div className='avatar'>
        <Avatar 
        src={imagePreviewUrlProfile}
        sx={{
            width:'10vh',
            height:'10vh',
          
            position:'relative'
        }}/>
        </div>
          <Panel signoutFuction={signout} openModalFuction={toggleVisibility} openProjectFuction={toggleVisibilityProjects}/>
          <CreateProjectButton />
         
        </div>
        
      </Grid>
     
    </Grid>
    {isVisible ? <DrawerConfig openModalHook={handleOpen} goToEditProfile={() =>{window.location.href = '/editProfile'}}/> : null}
    {isVisibleProjects ? <ProjectsDrawer fuctionDelete={deleteProject} fuctionEdit={editProject}  projects={projectProfile} /> : null}
    <DeleteAccountModal deleteAccount={deleteAccount} open={open} handleClose={handleClose}  />
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={8}>
        <div className='containerProjects' style={{display:'flex', gap:'5vh',flexDirection:'column'}}>
        {projectTimeline.map((item) => {
    
  if (item.author.id !== user.id) {
    console.log(item)
    return (
      <ButtonBase onClick={() => detailsProject(item.id)} >
      
      <ProjectTimeline
      key={item.id}
        avatar={true}
        profile={item.profile?.firebaseUrlFile}
        sx={{
          width: '100vh',
          backgroundColor: 'black',
          borderWidth: 2,

          borderColor: 'white',
        }}
        title={item.title}
        description={item.description}
        titleAuthor={item.author.name}
      />
   
      </ButtonBase>
    );
  } else {
    return null; 
  }
})}
    
        
        </div>
        </Grid>
        </Grid>
        </Box>
    </>
    )
}
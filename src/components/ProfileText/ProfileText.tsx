import { Box, Typography } from "@mui/material";


interface IProps {
    title: string,
    content: string
}

export default function ProfileText(props :IProps){
    return(
      <Box margin='3vh' display='flex' flexDirection='column'>
         <Typography fontSize='1.3rem' color='#8C8C8C'>{props.title}</Typography>
         <Typography fontSize='1.3rem' color='white'>{props.content}</Typography>
      </Box>
    )
}
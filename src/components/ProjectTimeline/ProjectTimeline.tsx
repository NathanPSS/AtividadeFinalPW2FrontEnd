import { Avatar, Box, Card, CardContent, CardHeader, Stack, SxProps, Theme, Typography } from "@mui/material";

interface IProps {
    avatar: boolean,
    title: string,
    titleAuthor :string,
    description: string,
    profile?: string
    sx: SxProps<Theme>
}


export default function ProjectTimeline(props :IProps) {
    return (
        <Card sx={props.sx}>
            {props.avatar ? <CardHeader 
        
            avatar={
                <Avatar
                src={props.profile}
                ></Avatar>
            }
            title={
                <Box sx={{display:'flex', alignItems:'flex-start'}}>
               <Typography >{props.titleAuthor}</Typography>
               </Box>
            }
            >   
              </CardHeader>
            : null  }
            <CardContent >
                <Stack >
                   <Typography color={'#DBF288'} variant='h6' alignSelf={'flex-start'}>{props.title}</Typography>
                   <Typography color={'white'} variant='body1' alignSelf={'flex-start'}>{props.description}</Typography>
                </Stack>
            </CardContent>
        </Card>
    
    )
}
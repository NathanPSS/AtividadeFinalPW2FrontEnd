import { Stack } from "@mui/material"




interface IProps {
    img: string,
    description: string
}




export default function OptionsPanel(props :IProps){
    return (
        <Stack direction='row' gap={5}  position='relative'>
            <img src={props.img} style={{
                width:'8vh',
                height:'8vh'
            }}/>
            <p style={{marginTop:30}}>{props.description}</p>
        </Stack>
    
    )
}
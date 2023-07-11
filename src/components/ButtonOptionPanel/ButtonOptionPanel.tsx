import { Box, Button } from "@mui/material"
import OptionsPanel from "../OptionsPanel/OptionsPanel"


interface IProps {
   img: string
   description: string
   action?: any
}

export default function ButtonOptionPanel(props :IProps) {
    return(
    <Box marginLeft={'2vh'} width={'32vh'}>
        <Button style={{borderRadius:20}} sx={{
            '&:hover':{
                backgroundColor:'#2e99af'
         }
        } 
    }
        onClick={props.action}
        TouchRippleProps={{style:{color:'white'}}}
        >
        <OptionsPanel img={props.img} description={props.description}/>
        </Button>
        </Box>
    )
}
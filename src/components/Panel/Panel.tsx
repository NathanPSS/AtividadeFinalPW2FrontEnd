
import { Box, Button, ButtonBase, Stack } from '@mui/material'
import imgProject from '../../assets/folder-management.png'
import OptionsPanel from '../OptionsPanel/OptionsPanel'
import imgConfig from '../../assets/Rectangle 8(1).png'
import imgSair from '../../assets/sair(1).png'
import ButtonOptionPanel from '../ButtonOptionPanel/ButtonOptionPanel'


interface IProps {
    openModalFuction :any
    openProjectFuction: any
    signoutFuction :any
}

export default function Panel(props :IProps){
    return(
     <Stack  direction='column' gap={10} marginTop={20} width={"33vh"} display='flex'>
        <ButtonOptionPanel action={props.openProjectFuction} img={imgProject} description='Meus Projetos'/>
        <ButtonOptionPanel img={imgSair} description='Sair' action={props.signoutFuction}/>
        <ButtonOptionPanel action={props.openModalFuction} img={imgConfig} description='Configurações'/>
    </Stack>
    )
}

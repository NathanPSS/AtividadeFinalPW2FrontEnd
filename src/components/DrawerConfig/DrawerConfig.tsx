
import { Button, Popover, Box, Typography, Stack } from '@mui/material';
import ButtonOptionPanel from '../ButtonOptionPanel/ButtonOptionPanel';
import wrenchImage from '../../assets/chave-de-boca.png'
import xImage from '../../assets/x.png'

interface IProps {
    openModalHook :any
    goToEditProfile:any
}

export const DrawerConfig = (props :IProps) => {

  return (
        <Box bgcolor='black'
        width={'40vh'}
        height={'100%'}
        marginLeft={'40vh'}
        display='flex'
        position='fixed'
        zIndex={999}
        >
          <Stack direction='column' gap={10} display='flex'>
            <Typography marginLeft={'2.5vh'} fontWeight='bold' marginTop={'2vh'} color='white' fontSize={'2.3rem'} variant='h1'>Configurações</Typography>
            <ButtonOptionPanel img={wrenchImage} description='Editar Perfil' action={props.goToEditProfile}/>
            <ButtonOptionPanel img={xImage} description='Excluir Conta' action={props.openModalHook} />
        </Stack>
        </Box>
  );
};


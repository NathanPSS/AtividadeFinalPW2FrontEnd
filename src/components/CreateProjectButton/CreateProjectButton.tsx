import { Button, Container,Box, Typography} from "@mui/material";
import { createBrowserHistory } from "history";


export default function CreateProjectButton(){


  const handleClick = () => {
    window.location.href = './criarProjeto'
  };
    return(
        <Box className="spacing" marginTop={20} marginLeft={5}>
         <Button  onClick={handleClick} type='button' variant='contained' style={{
            borderRadius:20,
            width:'25vh',
            backgroundColor:'#00A1E1',
            textTransform:'none',
            }}>
           Criar Projeto
        </Button>
        </Box>
    )
}
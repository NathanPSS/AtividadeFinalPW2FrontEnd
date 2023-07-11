
import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react";

interface IProps {
 
    handleClose :any
    open:any
    deleteAccount :any
}


export default function DeleteAccountModal(props :IProps){

  
    return (
      <div>
    
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={{
              
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'black',
              border: '0.5px solid white',
              boxShadow: 24,
              position:'fixed',
              zIndex:999,
              p: 4,

           }}>
            <Typography color='white' id="modal-modal-title" variant="h6" component="h2">
              Deletar Conta
            </Typography>
            <Typography color='white' id="modal-modal-description" sx={{ mt: 2 }}>
              Deseja deletar sua conta?
            </Typography>F
        
            <Box display='flex' justifyContent='space-between' marginTop='2vh'>
            <Button variant='contained' onClick={props.handleClose}>Fechar</Button>
            <Button variant='contained' color='error' onClick={props.deleteAccount}>Deletar</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
}
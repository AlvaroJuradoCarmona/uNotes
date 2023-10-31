import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

import fileService from '../../../../../services/file.service'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteFileModal({idDocument}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteData = (e) => {
    e.preventDefault()
    fileService.deleteFile(
      idDocument
    ).then(t=>{
      console.log(t)
      setOpen(false)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleOpen}>
        <DeleteIcon sx={{ color: red[500] }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>¿Seguro que quieres eliminar la asignatura?</strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Esta asignatura se eliminará permanentemente. Esta acción no se puede revertir.
          </Typography>
          <div className='adminModalButtons'>
            <Button variant="contained" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" onClick={deleteData} sx={{ backgroundColor: red[500] }}>Eliminar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
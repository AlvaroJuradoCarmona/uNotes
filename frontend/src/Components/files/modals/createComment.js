import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';

import commentService from '../../../services/comment.service'

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

export default function BasicModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [description, setDescription] = React.useState("");

  const idUser = user.idUser;
  const { id } = useParams();

  const handleDescription = (event) => {
    setDescription(event.target.value)
  };

  const insertData = (e) => {
    e.preventDefault()
    commentService.addComment({
      description, id, idUser
    }).then(t=>{
      console.log(t)
      setOpen(false)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nuevo comentario
          </Typography>
          <div className="uploadTitle">
            <TextField fullWidth
            placeholder="Inserte el comentario"
            multiline
            rows={2}
            onChange={handleDescription}
            />
          </div>
          <Button variant="contained" id="doneButton" onClick={insertData}>Subir</Button>
        </Box>
      </Modal>
    </div>
  );
}

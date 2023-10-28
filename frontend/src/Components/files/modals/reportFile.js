import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ReportIcon from '@mui/icons-material/Report';
import { red } from '@mui/material/colors';

import fileService from '../../../services/file.service'

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

export default function ReportModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [description, setDescription] = React.useState("");
  const [checkDescription, setCheckDescription] = React.useState(false)

  const idUser = user.idUser;
  const { id } = useParams();

  const handleDescription = (event) => {
    if (event.target.value.length > 0)
      setCheckDescription(false)
    else
      setCheckDescription(true)
    setDescription(event.target.value)
  };

  const insertData = (e) => {
    e.preventDefault()
    fileService.addReport({
      idUser, id, description
    }).then(t=>{
      console.log(t)
      setOpen(false)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ReportIcon  sx={{ color: red[500] }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reportar archivo
          </Typography>
          <div className="uploadTitle">
            <TextField fullWidth
            placeholder="Inserte la razón"
            multiline
            error={checkDescription}
            rows={2}
            onChange={handleDescription}
            />
            {checkDescription ? <p className='errorAlert'>No debe estar vacío</p>: null}
          </div>
          <Button variant="contained" id="doneButton" onClick={insertData}>Subir</Button>
        </Box>
      </Modal>
    </div>
  );
}

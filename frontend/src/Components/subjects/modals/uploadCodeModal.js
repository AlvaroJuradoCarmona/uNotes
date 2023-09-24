import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';

import LicenseInfo from './licenseInfo'

import fileService from '../../../services/file.service'
import licenseService from '../../../services/licenses.service'
import categoryService from '../../../services/categories.service'


import "./../subjects.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [languages, setLanguages] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState(6);
  const [licenses, setLicenses] = React.useState([]);
  const [selectedLicense, setSelectedLicense] = React.useState(1);

  const [checkTitle, setCheckTitle] = React.useState(false)
  const [checkDescription, setCheckDescription] = React.useState(false)

  const idUser = user.idUser;
  const { id } = useParams();

  const handleTitle = (event) => {
    if (event.target.value.length > 5)
      setCheckTitle(false)
    else
      setCheckTitle(true)
    setTitle(event.target.value)
  };

  const handleDescription = (event) => {
    if (event.target.value.length > 0)
      setCheckDescription(false)
    else
      setCheckDescription(true)
    setDescription(event.target.value)
  };

  const handleLanguage = ({target}) => {
    setSelectedLanguage(target.value)
  };

  const handleLicense = ({target}) => {
    setSelectedLicense(target.value)
  };

  React.useEffect(() => { 
    categoryService.getLanguages().then(p => {
      setLanguages(p);
    })
  }, []);

  React.useEffect(() => { 
    licenseService.getLicenses().then(p => {
      setLicenses(p);
    })
  }, []);

  const insertCode = (e) => {
    e.preventDefault()
    fileService.addCode({
      title, description, id, idUser, selectedLanguage, selectedLicense
    }).then(t=>{
      console.log(t)
      setOpen(false)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}>Upload code</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Subir archivos
          </Typography>
          <div className="uploadTitle">
            <TextField fullWidth error={checkTitle} label="Titulo" onChange={handleTitle}/>
            {checkTitle ? <p className='errorAlert'>Debe tener más de 6 carácteres</p>: null}
          </div>

          <div className="uploadTitle">
            <TextField fullWidth
            error={checkDescription}
            placeholder="Inserte el comentario"
            multiline
            rows={15}
            onChange={handleDescription}
            />
            {checkDescription ? <p className='errorAlert'>No debe estar vacío</p>: null}
            <Button target="_blank" rel="noreferrer" href="https://www.markdowntutorial.com/es/">¿No conoces el lenguaje de marcado?</Button>
          </div>

          <div className="selectorBox">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lenguaje</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue = "Lenguaje"
                value={selectedLanguage}
                label="Lenguaje"
                onChange={handleLanguage}
              >
                {languages.length > 0 &&
                  languages[0].map(({ idCategory, name }) => (
                    <MenuItem key={idCategory} value={idCategory}>{name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div className="selectorBox">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Licencia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue = "Licencia"
                value={selectedLicense}
                label="Licencia"
                onChange={handleLicense}
              >
                {licenses.length > 0 &&
                  licenses[0].map(({ idLicense, name }) => (
                    <MenuItem key={idLicense} value={idLicense}>{name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <LicenseInfo />
          
          <Button variant="contained" id="doneButton" onClick={insertCode}>Subir</Button>
        </Box>
      </Modal>
    </div>
  );
}

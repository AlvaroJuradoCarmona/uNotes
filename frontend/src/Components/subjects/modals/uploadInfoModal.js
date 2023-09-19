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

import UploadWidget from './../../files/uploadWidget';
import LicenseInfo from './licenseInfo'

import fileService from '../../../services/file.service'
import categoryService from '../../../services/categories.service'
import licenseService from '../../../services/licenses.service'


import "./../subjects.css";

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
  const [title, setTitle] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [licenses, setLicenses] = React.useState([]);
  const [selectedLicense, setSelectedLicense] = React.useState(1);
  const [url, updateUrl] = React.useState();
  const [error, updateError] = React.useState();
  const idUser = user.idUser;
  const { id } = useParams();
  

  const handleTitle = (event) => {
    setTitle(event.target.value)
  };

  const handleCategory = ({target}) => {
    setSelectedCategory(target.value)
  };

  React.useEffect(() => { 
    categoryService.getCategories().then(p => {
      setCategories(p);
    })
  }, []);

  const handleLicense = ({target}) => {
    setSelectedLicense(target.value)
  };

  React.useEffect(() => { 
    licenseService.getLicenses().then(p => {
      setLicenses(p);
    })
  }, []);

  const insertData = (e) => {
    e.preventDefault()
    fileService.addFile({
      title, url, id, selectedCategory, idUser, selectedLicense
    }).then(t=>{
      console.log(t)
      setOpen(false)
    }).catch(e=>{
      console.log(e);
    })
  }

  function handleOnUpload(error, result, widget) {
    if ( error ) {
      updateError(error);
      widget.close({
        quiet: true
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
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
            Subir archivos
          </Typography>
          <div className="uploadTitle">
            <TextField fullWidth label="Titulo" onChange={handleTitle}/>
          </div>

          <div className="selectorBox">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue = "Categoria"
                value={selectedCategory}
                label="Categoria"
                onChange={handleCategory}
              >
                {categories.length > 0 &&
                  categories[0].map(({ idCategory, name }) => (
                    <MenuItem key={idCategory} value={idCategory}>{name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          
          <div className="container">
            Seleccionar archivo:
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button onClick={handleOnClick}>
                    Añadir archivo
                  </button>
                )
              }}
            </UploadWidget>

            {error && <p>{ error }</p>}
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
          
          <Button variant="contained" id="doneButton" onClick={insertData}>Subir</Button>
        </Box>
      </Modal>
    </div>
  );
}

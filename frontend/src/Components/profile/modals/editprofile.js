import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import UploadWidget from './../../files/uploadWidget';

import authService from './../../../services/auth.service'
import universityService from './../../../services/university.service'
import facultyService from './../../../services/faculty.service'

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

export default function EditProfile({user}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = React.useState(false);
  const [error, updateError] = React.useState();
  const [url, updateUrl] = React.useState();

  const [newUsername, setNewUsername] = React.useState("");
  const [checkNewUsername, setCheckNewUsername] = React.useState(false)
  const [newEmail, setNewEmail] = React.useState("");
  const [checkNewEmail, setCheckNewEmail] = React.useState(false)
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState(false)
  const [checkPasswordConfirmation, setCheckPasswordConfirmation] = React.useState(false)
  const [faculties, setFaculties] = React.useState([]);
  const [universities, setUniversities] = React.useState([]);
  const [selectedFaculty, setSelectedFaculty] = React.useState(1);
  const [selectedUniversity, setSelectedUniversity] = React.useState(1);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNewUsername = (event) => {
    if ((event.target.value.length < 20) && (event.target.value.length > 0))
      setCheckNewUsername(false)
    else
      setCheckNewUsername(true)
    setNewUsername(event.target.value)
  };

  const handleNewEmail = (event) => {
    if (event.target.value.length > 0)
      setCheckNewEmail(false)
    else
      setCheckNewEmail(true)
    setNewEmail(event.target.value)
  };

  const handlePassword = (event) => {
    if (event.target.value.length > 7)
      setCheckPassword(false)
    else
      setCheckPassword(true)
    setPassword(event.target.value)
  };

  const handlePasswordConfirmation = (event) => {
    if (event.target.value.length > 7)
      setCheckPasswordConfirmation(false)
    else
      setCheckPasswordConfirmation(true)
    setPasswordConfirmation(event.target.value)
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUniversity = ({target}) => {
    setSelectedUniversity(target.value)
  };

  const handleFaculty = (event) => {
    setSelectedFaculty(event.target.value)
  };

  React.useEffect(() => { 
    universityService.getUniversities().then(p => {
      setUniversities(p);
    })
  }, []);

  React.useEffect(() => { 
    facultyService.getFacultiesByUniversity(selectedUniversity).then(p => {
      setFaculties(p);
    })
  }, [selectedUniversity]);

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

  const editAvatar = (e) => {
    e.preventDefault()
    setOpen(false)
    authService.updateAvatar({
      idUser: user.idUser, avatar_url: url
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  const editUsername = (e) => {
    e.preventDefault()
    setOpen(false)
    authService.updateUsername({
      idUser: user.idUser, username: newUsername
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  const editEmail = (e) => {
    e.preventDefault()
    setOpen(false)
    authService.updateEmail({
      idUser: user.idUser, email: newEmail
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  const editPassword = (e) => {
    e.preventDefault()
    setOpen(false)
    authService.updatePassword({
      idUser: user.idUser, password, passwordConfirmation
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  const editStudies = (e) => {
    e.preventDefault()
    setOpen(false)
    authService.updateStudies({
      idUser: user.idUser, idUniversity: selectedUniversity, idFaculty: selectedFaculty
    }).then(t=>{
      console.log(t)
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '8%' }}>
        <Button variant='outlined' color='secondary' onClick={handleOpen}>Editar perfil</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
		<div className='profileAvatar'>
			<Avatar sx={{ bgcolor: red[500], width: 150, height: 150 }} aria-label="recipe" src={url ? url : user.avatar_url}></Avatar>
    </div>
    <UploadWidget onUpload={handleOnUpload}>
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        }
        return (
          <div className='editAvatarButton'>
          {url ? (
            <Button variant="contained" color="secondary" onClick={editAvatar}>
              Confirmar cambio
            </Button>
          ) : (
            <Button variant="outlined" color="secondary" onClick={handleOnClick}>
              Cambiar Avatar
            </Button>
          )}
          </div>
        )
      }}
    </UploadWidget>
    {error && <p>{ error }</p>}
    
		<div>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
				>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>
					Usuario
				</Typography>
				<Typography sx={{ color: 'text.secondary' }}>{user.username}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField fullWidth error={checkNewUsername} label="Usuario" onChange={handleNewUsername}/>
					{checkNewUsername ? <p className='errorAlert'>Debe tener entre 0 y 20 carácteres</p>: null}
					<Button fullWidth variant="contained" color="secondary" sx={{ marginTop: 2}} onClick={editUsername}>Aplicar cambios</Button>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel2bh-content"
				id="panel2bh-header"
				>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>Email</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					{user.email}
				</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField fullWidth error={checkNewEmail} label="Nuevo Correo electrónico" onChange={handleNewEmail}/>
          			{checkNewEmail ? <p className='errorAlert'>No debe estar vacío</p>: null}
					<Button fullWidth variant="contained" color="secondary" sx={{ marginTop: 2}} onClick={editEmail}>Aplicar cambios</Button>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel3bh-content"
				id="panel3bh-header"
				>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>
					Contraseña
				</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormControl sx={{ width: '100%', marginBottom: 2 }} variant="outlined" className="signTextField">
						<InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
						<OutlinedInput
							type={showPassword ? 'text' : 'password'}
							endAdornment={
							<InputAdornment position="end">
								<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								>
								{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
							}
							label="Contraseña"
							error={checkPassword}
							onChange={handlePassword}
						/>
						{checkPassword ? <p className='errorAlert'>Debe al menos 8 carácteres</p>: null}
					</FormControl>
          <FormControl sx={{ width: '100%' }} variant="outlined" className="signTextField">
              <InputLabel htmlFor="outlined-adornment-password">Confirmación</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmación"
                error={checkPasswordConfirmation}
                onChange={handlePasswordConfirmation}
              />
              {checkPasswordConfirmation ? <p className='errorAlert'>Debe al menos 8 carácteres</p>: null}
            </FormControl>
            <Button fullWidth variant="contained" color="secondary" sx={{ marginTop: 2}} onClick={editPassword}>Aplicar cambios</Button>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel4bh-content"
				id="panel4bh-header"
				>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>Estudios</Typography>
				</AccordionSummary>
				<AccordionDetails>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">Universidad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue = ""
              value={selectedUniversity}
              label="Facultad"
              onChange={handleUniversity}
            >
              {universities.length > 0 &&
                universities[0].map(({ idUniversity, name }) => (
                  <MenuItem key={idUniversity} value={idUniversity}>{name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue = ""
              value={selectedFaculty}
              label="Facultad"
              onChange={handleFaculty}
            >
              {faculties.length > 0 &&
                faculties[0].map(({ idFaculty, name }) => (
                  <MenuItem key={idFaculty} value={idFaculty}>{name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="secondary" sx={{ marginTop: 2}} onClick={editStudies}>Aplicar cambios</Button>
				</AccordionDetails>
			</Accordion>
		</div>
        </Box>
      </Modal>
    </div>
  );
}
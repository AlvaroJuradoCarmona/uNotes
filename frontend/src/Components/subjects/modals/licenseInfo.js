import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ccby from './../../../assets/licenses/cc_by.png'
import ccbysa from './../../../assets/licenses/cc_by-sa.png'
import ccbynd from './../../../assets/licenses/cc_by-nd.png'
import ccbync from './../../../assets/licenses/cc_by-nc.png'
import ccbyncsa from './../../../assets/licenses/cc_by-nc-sa.png'
import ccbyncnd from './../../../assets/licenses/cc_by-nc-nd.png'

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
  textAlign: 'justify'
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ marginBottom:2 }} onClick={handleOpen}>¿Necesitas información sobre las licencias?</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Información acerca de las licencias
          </Typography>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento CC BY</b></p>
            <img src={ccby} alt="CC BY" style={{ width: "70px", height: "auto" }}/>
          </div>
          <p>Esta licencia permite a otros distribuir, remezclar, adaptar y desarrollar su trabajo, incluso comercialmente, siempre que le den crédito por la creación original. Esta es la licencia más flexible que se ofrece. Recomendado para máxima difusión y uso de materiales licenciados.</p>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento-ShareEqual CC BY-SA</b></p>
            <img src={ccbysa} alt="CC BY-SA" style={{ width: "70px", height: "auto" }}/>
          </div>
          <p>Esta licencia permite a otros remezclar, adaptar y desarrollar su trabajo incluso con fines comerciales, siempre que le den crédito y concedan licencias para sus nuevas creaciones bajo los mismos términos. Esta licencia a menudo se compara con las licencias de software libre y de código abierto “copyleft”.</p>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento-SinTrabajoDerivado CC BY-ND</b></p>
            <img src={ccbynd} alt="CC BY-ND" style={{ width: "70px", height: "auto" }}/>
          </div>
          <p>Esta licencia permite a otros reutilizar la obra para cualquier fin, incluso comercial; sin embargo, no se puede compartir con otros en forma adaptada y se le debe proporcionar crédito.</p>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento-NoComercial CC BY-NC</b></p>
            <img src={ccbync} alt="CC BY-NC" style={{ width: "70px", height: "auto" }}/>
          </div>
          <p>Esta licencia permite a otros remezclar, adaptar y desarrollar su trabajo sin fines comerciales, y aunque sus nuevos trabajos también deben reconocerlo y no ser comerciales, no tienen que licenciar sus trabajos derivados en los mismos términos.</p>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento-NoComercial-CompartirIgual CC BY-NC-SA</b></p>
            <img src={ccbyncsa} alt="CC BY-NC-SA" style={{ width: "70px", height: "auto" }}/>
          </div>
          <p>Esta licencia permite a otros remezclar, adaptar y desarrollar su trabajo sin fines comerciales, siempre y cuando le den crédito y concedan licencias para sus nuevas creaciones bajo los mismos términos.</p>
          <br/>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <p style={{ marginRight: "15px" }}><b>Reconocimiento-NoComercial-SinObraDerivada CC BY-NC-ND</b></p>
            <img src={ccbyncnd} alt="CC BY-NC-ND" style={{ width: "70px", height: "auto" }}/>
          </div> 
          <p>Esta licencia es la más restrictiva de las seis licencias principales, sólo permite que otros puedan descargar las obras y compartirlas con otras personas, siempre que se reconozca su autoría, pero no se pueden cambiar de ninguna manera ni se pueden utilizar comercialmente.</p>
          <br/>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" id="doneButton" onClick={handleClose}>Entendido</Button>
            <Button target="_blank" rel="noreferrer" href="https://creativecommons.org/share-your-work/cclicenses/">¿Más información?</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from 'react';
/*import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import { purple } from '@mui/material/colors';*/
import UploadInfoModal from "./modals/uploadInfoModal"

//import fileServices from "../../services/file.service"


export default function BasicTable({ user }) {
  
  /*const [files, setFiles] = useState([])

  useEffect(() => {
    filesServices.getSubjects().then(p => {
      setFiles(p);
    })
  }, [])
*/
  return ( //files.length !== 0 ?
    <UploadInfoModal user={user} />
    /*(<div className="fit_table">
      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Asignatura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files[0].map(({name}, id) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className="foldericon"><FolderIcon sx={{ color: purple[500], fontSize: 30}}/></TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>):
    (<div><h1>No hay archivos disponibles</h1></div>)*/
  );
  
}
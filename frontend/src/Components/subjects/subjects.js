import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import subjectsServices from "../../services/subjects.service"
import { purple } from '@mui/material/colors';

import "./subjects.css";

export default function BasicTable() {

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    subjectsServices.getSubjects().then(p => {
      setSubjects(p);
    })
  }, [])

  return ( subjects.length !== 0 ?
    (<div className="fit_table">
      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Asignatura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects[0].map(({name}, id) => (
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
    (<div><h1>ERROR</h1></div>)
  );
  
}
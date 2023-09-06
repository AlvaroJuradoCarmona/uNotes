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
import { purple } from '@mui/material/colors';

import subjectsServices from "../../services/subjects.service"
import userServices from "../../services/user.service"

import "./subjects.css";

export default function SubjectList({user}) {

  const [subjects, setSubjects] = useState([])

  async function fetchData(idUser) {
    try {
      const userInfo = await userServices.getUserById(idUser);
      const idFaculty = userInfo[0][0].idFaculty;
      const subjectsData = await subjectsServices.getSubjectsByFacultyId(idFaculty);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    fetchData(user.idUser);
  }, [user.idUser]);

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
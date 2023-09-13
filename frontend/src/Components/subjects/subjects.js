import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/subject/${id}`);
  };

  return ( subjects.length !== 0 ?
    (<div className="fit_table">
      <div className="courseButton">
        <ButtonGroup  variant="text" color = "secondary" aria-label="outlined large primary button group">
          <Button sx={{ color: purple[500], width: 100}}>TODAS</Button>
          <Button sx={{ color: purple[500], width: 100}}>1º CURSO</Button>
          <Button sx={{ color: purple[500], width: 100}}>2º CURSO</Button>
          <Button sx={{ color: purple[500], width: 100}}>3º CURSO</Button>
          <Button sx={{ color: purple[500], width: 100}}>4º CURSO</Button>
        </ButtonGroup>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects[0].map(({idSubject, name, documentCount}, id) => (
              <TableRow
                key={id}
                className="subject-row"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(idSubject)}
              >
                <TableCell className="foldericon"><FolderIcon sx={{ color: purple[500], fontSize: 30}}/></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell><AttachFileIcon sx={{ fontSize: 18 }}/></TableCell>
                <TableCell>{documentCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>):
    (<div><h1>ERROR</h1></div>)
  );
  
}
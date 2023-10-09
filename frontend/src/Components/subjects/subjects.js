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
import SubjectSearch from './../search/subjectsSearch'

import subjectsService from "../../services/subjects.service"
import userService from "../../services/user.service"
import facultyService from "../../services/faculty.service"

import "./subjects.css";

export default function SubjectList({user}) {

  const [subjects, setSubjects] = useState([])
  const [courseFiltered, setCourseFiltered] = useState([])
  const [faculty, setFaculty] = useState("")

  async function fetchData(idUser) {
    try {
      const userInfo = await userService.getUserById(idUser);
      const idFaculty = userInfo[0][0].idFaculty;
      const subjectsData = await subjectsService.getSubjectsByFacultyId(idFaculty);
      setSubjects(subjectsData);
      setCourseFiltered(subjectsData[0]);
      const facultyInfo = await facultyService.getFacultyById(idFaculty)
      setFaculty(facultyInfo[0][0].name)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData(user.idUser);
  }, [user.idUser]);

  function courseFilter (course) {
    if(course === "")
      setCourseFiltered(subjects[0])
    else
      setCourseFiltered(subjects[0].filter(s => s.course === course))
  }

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/subject/${id}`);
  };

  return (
    <div>
      <div className='searchContainer'>
        <div className='whiteContainer'>
          <SubjectSearch />
        </div> 
      </div>
      <div className="facultyName">
        <h1>Grado en {faculty}</h1>
      </div>
      <div>
        {subjects && subjects.length !== 0 ?
        (<div className="fit_table">
          <div className="courseButton">
            <ButtonGroup variant="text" color = "secondary" aria-label="outlined large primary button group">
              <Button onClick={() => courseFilter("")} sx={{ color: purple[500], width: 100}}>TODAS</Button>
              <Button onClick={() => courseFilter("1º")} sx={{ color: purple[500], width: 100}}>1º CURSO</Button>
              <Button onClick={() => courseFilter("2º")} sx={{ color: purple[500], width: 100}}>2º CURSO</Button>
              <Button onClick={() => courseFilter("3º")} sx={{ color: purple[500], width: 100}}>3º CURSO</Button>
              <Button onClick={() => courseFilter("4º")} sx={{ color: purple[500], width: 100}}>4º CURSO</Button>
              <Button onClick={() => courseFilter("OPTATIVAS")} sx={{ color: purple[500], width: 100}}>OPTATIVAS</Button>
            </ButtonGroup>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {courseFiltered.map(({idSubject, name, documentCount}, id) => (
                  <TableRow
                    key={id}
                    className="subject-row"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleRowClick(idSubject)}
                  >
                    <TableCell className="foldericon"><FolderIcon sx={{ color: purple[500], fontSize: 30}}/></TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell><AttachFileIcon sx={{ fontSize: 18 }}/>{documentCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
        </div>
        ):(
        <div><h1>ERROR</h1></div>)}
      </div>
    </div>
  );
  
}
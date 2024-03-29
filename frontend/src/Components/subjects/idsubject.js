import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import pdfImage from './../../assets/pdf.png';
import codeImage from './../../assets/code.png';

import UploadInfoModal from "./modals/uploadInfoModal"
import UploadCodeModal from "./modals/uploadCodeModal"

import fileService from "../../services/file.service"
import subjectService from "../../services/subjects.service"

export default function BasicTable({ user }) {
  const [files, setFiles] = useState([])
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categoryFiltered, setCategoryFiltered] = useState([])
  const [subjectName, setSubjectName] = useState("")

  const [page, setPage] = useState(1);
  const filesPerPage = 10;

  const { id } = useParams();

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value)
  };

  const handlePageChange = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const startIndex = (page - 1) * filesPerPage;
  const endIndex = startIndex + filesPerPage;
  const displayedFiles = categoryFiltered.slice(startIndex, endIndex);

  const fetchData = useCallback(async () => {
    try {
      const fileData = await fileService.getFilesBySubjectId(id);
      setFiles(fileData);
      setCategoryFiltered(fileData[0])
      const subjectName = await subjectService.getSubjectById(id)
      setSubjectName(subjectName[0][0].name)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function categoryFilter (category) {
    if(category === "")
      setCategoryFiltered(files[0])
    else
      setCategoryFiltered(files[0].filter(s => s.idCategory === category))
  }

  const navigate = useNavigate();

  const insertData = (idDocument) => {
    fileService.addViewLog({
      idUser: user.idUser, idDocument
    }).then(t=>{
      console.log(t)
      navigate(`/file/${idDocument}`);
    }).catch(e=>{
      console.log(e);
    })
  }

  return (
    <>
      <div className='filelistHeader'>
        <h1>{subjectName}</h1>
      </div>
      <div className="filelistHeader2">
        <div className="selectorBox">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory || "Todas"}
              label="Categoria"
              onChange={handleCategory}
              defaultValue = ""
            >
              <MenuItem value="Todas" onClick={() => categoryFilter("")}>Todas</MenuItem>
              <MenuItem value="Exámenes" onClick={() => categoryFilter(1)}>Exámenes</MenuItem>
              <MenuItem value="Apuntes" onClick={() => categoryFilter(2)}>Apuntes</MenuItem>
              <MenuItem value="Ejercicios" onClick={() => categoryFilter(3)}>Ejercicios</MenuItem>
              <MenuItem value="Prácticas" onClick={() => categoryFilter(4)}>Prácticas</MenuItem>
              <MenuItem value="Código" onClick={() => categoryFilter(6)}>Código</MenuItem>
              <MenuItem value="Otros" onClick={() => categoryFilter(5)}>Otros</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='filelistUploadButtons'>
          <UploadInfoModal user={user} />
          <UploadCodeModal user={user} />
        </div>
      </div>
      <div className="fit_table">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedFiles.map(({ idDocument, title, created_at, username, avatar_url, idCategory, views }, id) => (
                <TableRow
                  key={id}
                  className="subject-row"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => insertData(idDocument)}
                >
                  <TableCell sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>        
                  {idCategory >= 6 ? (
                    <img src={codeImage} alt="Código" />
                  ) : (
                    <img src={pdfImage} alt="PDF" />
                  )}
                  </TableCell>
                  <TableCell sx={{ fontSize:"16px" }}><strong>{title}</strong></TableCell>
                  <TableCell>{created_at}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Avatar sx={{ bgcolor: red[500], width: 35, height: 35 }} aria-label="recipe" src={avatar_url}></Avatar>
                  </TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'right' }}><RemoveRedEyeOutlinedIcon sx={{ width: 25, height: 30 }}/></TableCell>
                  <TableCell>{views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {categoryFiltered.length > filesPerPage && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(categoryFiltered.length / filesPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="secondary"
                    size="large"
                />
              </div>
            )}
      </div>
    </>
  );
}
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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteFileModal from './../adminpanel/tabs/files/modals/deletefile'
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import IconButton from '@mui/material/IconButton';

import pdfImage from './../../assets/pdf.png';
import codeImage from './../../assets/code.png';

import fileService from "../../services/file.service"
import userService from "../../services/user.service"

export default function BasicTable({ user }) {
  const [files, setFiles] = useState([])
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categoryFiltered, setCategoryFiltered] = useState([])
  const [userInfo, setUserInfo] = useState([])

  const [page, setPage] = useState(1);
  const filesPerPage = 20;

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
      const fileData = await fileService.getFilesByUserId(id);
      setFiles(fileData);
      setCategoryFiltered(fileData[0])
      const userInfo = await userService.getUserById(id)
      setUserInfo(userInfo[0][0])
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

  const handleFile = (id) => {
    navigate(`/file/${id}`);
  };

  return (
    <>
      <div className='filelistHeader2'>
        <h1>Publicaciones de {userInfo.username}</h1>
      
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
      </div>
      
      <div className="fit_table">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedFiles.map(({ idDocument, title, created_at, idCategory, views }, id) => (
                <TableRow
                  key={id}
                  className="subject-row"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                  <TableCell sx={{ display: 'flex', justifyContent: 'right' }}><RemoveRedEyeOutlinedIcon sx={{ width: 25, height: 30 }}/></TableCell>
                  <TableCell>{views}</TableCell>
                  <TableCell style={{ width: 50 }}>
                    <IconButton onClick={() => handleFile(idDocument)}>
                      <ArrowCircleUpRoundedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell style={{ width: 100 }}><DeleteFileModal idDocument={idDocument} /></TableCell>
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
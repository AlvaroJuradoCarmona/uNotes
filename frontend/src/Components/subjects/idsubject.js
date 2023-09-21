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

import UploadInfoModal from "./modals/uploadInfoModal"
import UploadCodeModal from "./modals/uploadCodeModal"

import fileService from "../../services/file.service"

export default function BasicTable({ user }) {
  
  const [files, setFiles] = useState([])
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [categoryFiltered, setCategoryFiltered] = useState([])
  const { id } = useParams();

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value)
  };

  const fetchData = useCallback(async () => {
    try {
      const fileData = await fileService.getFilesBySubjectId(id);
      setFiles(fileData);
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

  const handleRowClick = (id) => {
    navigate(`/file/${id}`);
  };

  return (
    <>
      <UploadInfoModal user={user} />
      <UploadCodeModal user={user} />

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
      
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryFiltered.map(({ idDocument, title }, id) => (
                <TableRow
                  key={id}
                  className="subject-row"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleRowClick(idDocument)}
                >
                  <TableCell ></TableCell>
                  <TableCell>{title}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
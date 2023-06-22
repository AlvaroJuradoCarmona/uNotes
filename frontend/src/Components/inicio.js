import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import languageServices from "../services/language.service"


export default function BasicTable() {

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    languageServices.getLanguages().then(p => {
      setLanguages(p);
    })
  }, [])

  console.log(languages)

  return ( languages.length !== 0 ?
    (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {languages[0].map(({idLanguages, name, author, year}, id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{idLanguages}</TableCell>
              <TableCell align="right">{name}</TableCell>
              <TableCell align="right">{author}</TableCell>
              <TableCell align="right">{year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>):
    (<div><h1>ERROR</h1></div>)
  );
}
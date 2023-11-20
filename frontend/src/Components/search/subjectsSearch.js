import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Link from '@mui/material/Link';

import subjectsService from "../../services/subjects.service"

import "./search.css"

const GroupHeader = styled('div')(() => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: "black",
  backgroundColor: "#DFB7E5",
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function RenderGroup() {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);

  const fetchData = useCallback(async () => {
    try {
      const searchData = await subjectsService.getSearchInfo();
      const searchOptions = searchData[0].map(search => ({
        id: search.id,
        name: search.name,
        idCategory: search.idCategory
      }));
      setOptions(searchOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (value) {
      if (value.idCategory === "Asignatura") {
        handleSubjectClick(value.id);
      } else if (value.idCategory === "Archivo") {
        handleFileClick(value.id);
      }
    }
  };

  const handleSubjectClick = (id) => {
    navigate(`/subject/${id}`);
  };

  const handleFileClick = (id) => {
    navigate(`/file/${id}`);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', opacity: '100%' }}>
        {options && options.length !== 0 ?
        <Autocomplete
          id="grouped-demo"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          options={options.sort((a, b) => -b.idCategory.localeCompare(a.idCategory))}
          groupBy={(info) => info.idCategory}
          getOptionLabel={(info) => (info ? info.name : "")}
          sx={{ width: 1200, marginLeft: 4, marginRight: 4, backgroundColor: 'white', borderRadius: 1, border: 'none' }}
          renderInput={(params) => <TextField {...params} />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />
        : null}
        <Link className="searchButton" variant="contained" id="doneButton" onClick={handleSearchClick} style={{ textDecoration: 'none', color: 'white', fontSize: 19 }}>Buscar</Link>
      </div>
    </>
  );
}
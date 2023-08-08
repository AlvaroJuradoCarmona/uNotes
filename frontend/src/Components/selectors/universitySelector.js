import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import universityServices from '../../services/university.service';

import "./selector.css";

export default function UniversitySelect({ setSelectedUniversity }) {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversityLocal] = useState('');

  useEffect(() => { 
    universityServices.getUniversities().then(p => {
      setUniversities(p);
    })
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUniversityLocal(selectedValue);
    setSelectedUniversity(selectedValue);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Universidad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUniversity}
          label="Universidad"
          onChange={handleChange}
        >
          {universities.length > 0 &&
            universities[0].map(({ idUniversity, name }) => (
              <MenuItem key={idUniversity} value={idUniversity}>{name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

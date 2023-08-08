import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import facultyServices from '../../services/faculty.service';
import UniversitySelect from './universitySelector';

import "./selector.css";

export default function FacultySelect(props) {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => { 
    facultyServices.getFacultiesByUniversity(selectedUniversity).then(p => {
      setFaculties(p);
    })
  }, [selectedUniversity]);

  useEffect(() => {
    props.onChange({
      selectedFaculty,
      selectedUniversity
    })
  }, [props, selectedFaculty, selectedUniversity])

  const handleChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  return (
    <Box>
      <UniversitySelect setSelectedUniversity={setSelectedUniversity} />
      <div className="selectorBox">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Facultad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedFaculty}
            label="Facultad"
            onChange={handleChange}
          >
            {faculties.length > 0 &&
              faculties[0].map(({ name }, id) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
 
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Users from './tabs/users/users'
import Subjects from './tabs/subjects/subjects'

import './admin.css'

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
        <div className='adminTabs'>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Estadísticas" />
                <Tab value="users" label="Usuarios" />
                <Tab value="subjects" label="Asignaturas" />
            </Tabs>
        </div>
        <div className="adminContentBox">
            {value === 'users' && <Users />}
            {value === 'subjects' && <Subjects />}
        </div>
    </Box>
  );
}
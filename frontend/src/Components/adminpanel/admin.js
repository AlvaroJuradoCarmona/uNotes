import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Stats from './tabs/stats/stats'
import Users from './tabs/users/users'
import Subjects from './tabs/subjects/subjects'
import Files from './tabs/files/files'
import Reports from './tabs/reportslog/reportslog'

import './admin.css'

export default function ColorTabs() {
  const [value, setValue] = React.useState('stats');

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
              <Tab value="stats" label="Estadísticas" />
              <Tab value="users" label="Usuarios" />
              <Tab value="subjects" label="Asignaturas" />
              <Tab value="files" label="Archivos" />
              <Tab value="reports" label="Reportes" />
            </Tabs>
        </div>
        <div className="adminContentBox">
          {value === 'stats' && <Stats />}
          {value === 'users' && <Users />}
          {value === 'subjects' && <Subjects />}
          {value === 'files' && <Files />}
          {value === 'reports' && <Reports />}
        </div>
    </Box>
  );
}
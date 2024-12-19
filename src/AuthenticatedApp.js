import React, { useState } from 'react';
import { useAuth } from './auth/AuthContext';
import ProjectListComponent from './components/ProjectListComponent';
import AddProjectForm from './components/AddProjectForm';
import TaskListComponent from './components/TaskListComponent';
import AddTaskForm from './components/AddTaskForm';
import { Box, Typography, Button } from '@mui/material';

const AuthenticatedApp = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { user, logout } = useAuth();

  console.log("User in AuthenticatedApp:", user); 

  return (
    <Box p={2}>
      {/* Header dengan Logout Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#6a11cb', 
            fontWeight: 'bold', 
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)' 
          }}
        >
          Manajemen Proyek
        </Typography>
        <Button 
          onClick={logout} 
          variant="contained" 
          color="secondary" 
          sx={{ 
            background: 'linear-gradient(to right, #6a11cb, #2575fc)', 
            color: '#fff', 
            '&:hover': { background: 'linear-gradient(to right, #2575fc, #6a11cb)' } 
          }}
        >
          Logout
        </Button>
      </Box>

      {user.username === 'admin' && <AddProjectForm onProjectAdded={() => {}} />}
      <ProjectListComponent onProjectSelect={setSelectedProjectId} />
      {selectedProjectId && (
        <>
          {user.username === 'admin' && <AddTaskForm projectId={selectedProjectId} onTaskAdded={() => {}} />}
          <TaskListComponent projectId={selectedProjectId} />
        </>
      )}
    </Box>
  );
};

export default AuthenticatedApp;

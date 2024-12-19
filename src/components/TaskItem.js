import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, MenuItem, Paper, IconButton } from '@mui/material';

const TaskItem = ({ task, onTaskUpdated}) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`https://test-fe.sidak.co.id/api/tasks/${task.id}`, { status: newStatus });
      setStatus(newStatus);
      onTaskUpdated(task.id, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1, transition: '0.3s', '&:hover': { boxShadow: 5 } }}>
      <Box display="flex" alignItems="center">
        <Box 
          sx={{ 
            width: 10, 
            height: 10, 
            borderRadius: '50%', 
            backgroundColor: status === 'Completed' ? 'green' : status === 'In Progress' ? 'orange' : 'red', 
            marginRight: 1 
          }} 
        />
        <Typography variant="subtitle1">{task.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          variant="outlined"
          size="small"
          sx={{ marginRight: 2 }}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
};

export default TaskItem;
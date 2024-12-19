import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Typography, Paper } from '@mui/material';

const AddTaskForm = ({ projectId, onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`https://test-fe.sidak.co.id/api/projects/${projectId}/tasks`, {
        name: taskName,
        status,
      });
      onTaskAdded(response.data);
      setTaskName('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom align="center">Tambah Tugas Baru</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nama Tugas"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
          required
          sx={{ borderRadius: 1 }}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ borderRadius: 1 }}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 1 }}>
            {error}
          </Typography>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth 
          sx={{ 
            background: 'linear-gradient(to right, #6a11cb, #2575fc)', 
            color: '#fff', 
            '&:hover': { background: 'linear-gradient(to right, #2575fc, #6a11cb)' },
            borderRadius: 1 
          }}
        >
          Tambah Tugas
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTaskForm;
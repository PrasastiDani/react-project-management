import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddProjectForm = ({ onProjectAdded, open, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://test-fe.sidak.co.id/api/projects', { name, description });
      onProjectAdded(response.data);
      setName('');
      setDescription('');
      onClose();  
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: '20px auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" gutterBottom>Tambah Proyek Baru</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nama Proyek"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Deskripsi Proyek"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Button variant="contained" color="primary" type="submit" width="30%" >
            Tambah Proyek
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddProjectForm;

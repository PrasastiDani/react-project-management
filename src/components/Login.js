import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f2f5'
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">LOGIN</Typography>
        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            sx={{ borderRadius: 1 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{ borderRadius: 1 }}
          />
          <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              sx={{ 
                width: '30%',
                '&:hover': { backgroundColor: '#1976d2' },
                borderRadius: 1 
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { readCSV } from '../utils/csvReader';
import csvFile from '../assets/rotten_tomatoes_critic_reviews.csv';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    publisher: '',
    password: '',
  });
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publisherData = await readCSV(csvFile, 'publisher_name');
        setPublishers(publisherData);
      } catch (error) {
        console.error('Error reading CSV file:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Publishers:', publishers); // Debugging output
    console.log('Form Data:', formData); // Debugging output
    //debugger; // Pause execution here

    if (!publishers.includes(formData.publisher)) {
      setError('Publisher no existe en los datos.');
      return;
    }
    
    localStorage.setItem('userData', JSON.stringify(formData)); 
    navigate('/show-list');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={Boolean(error)}
            helperText={error}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;

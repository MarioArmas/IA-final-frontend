import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

export const ShowList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/set-review');
  }

  useEffect(() => {
    //consumo de API para la lista de peliculas
    const page = {
      page: "1",
    };
    fetch('http://localhost:8000/get-all-movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(page),
    })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Movies List
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie, index) => (
              <TableRow key={index}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.info}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBtnClick()}>
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};



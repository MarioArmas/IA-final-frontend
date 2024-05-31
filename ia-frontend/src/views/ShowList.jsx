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
    fetch('http://localhost:8000/get-all-movies', {
      headers: {
        'Content-Type': 'application/json'
      }
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
                <TableCell>{movie.movie_title}</TableCell>
                <TableCell>{movie.movie_info}</TableCell>
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



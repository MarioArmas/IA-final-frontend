import React, { useState } from 'react';
import './SetReview.css';

export const SetReview = () => {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      review: reviewText,
    };
    // Convertir el objeto JSON a una cadena
    const jsonString = JSON.stringify(reviewData, null, 2);

    // Crear un blob con el contenido del JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Crear una URL para el blob
    const url = URL.createObjectURL(blob);

    // Crear un elemento de anclaje temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = 'review.json'; // Nombre del archivo que se descargará
    link.click(); // Simular un clic para iniciar la descarga

    // Limpiar el blob después de descargar
    URL.revokeObjectURL(url);

    // Limpia el texto después de enviarlo
    setReviewText('');
  };

  return (
    <div className="set-review-container">
      <h2>Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="review-textarea"
          placeholder="Escribe tu reseña aquí..."
          value={reviewText}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-button">
          Ingresar
        </button>
      </form>
    </div>
  );
};

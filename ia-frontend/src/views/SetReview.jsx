import React, { useState } from 'react';
import './SetReview.css';

export const SetReview = () => {
  const [reviewText, setReviewText] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      review: reviewText,
    };
    try {
      const response = await fetch('http://localhost:8000/get-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      //if (!response.ok) {
      //  throw new Error('Network response was not ok');
      //}
      console.log({response})

      const result = await response.json();
      setResponseMessage('Reseña enviada con éxito: ' + JSON.stringify(result));

      // Mostrar la notificación con la información recibida
      alert('Reseña enviada con éxito: ' + JSON.stringify(result));

      // Limpia el texto después de enviarlo
      setReviewText('');
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      setResponseMessage('Error al enviar la reseña');

      // Mostrar la notificación en caso de error
      alert('Error al enviar la reseña');
    }
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
      {responseMessage && <div className="response-message">{responseMessage}</div>}
    </div>
  );
};


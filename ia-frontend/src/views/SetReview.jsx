import React, { useState } from 'react';
import './SetReview.css';

export const SetReview = () => {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con el texto de la reseña, como enviarlo a un servidor, etc.
    console.log('Texto de la reseña:', reviewText);
    // Limpia el texto después de enviarlo, si es necesario
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

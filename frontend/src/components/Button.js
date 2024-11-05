import React from 'react';

const Button = ({ onClick, text, type, className }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
    className={`px-4 py-2 ${className} font-semibold hover:opacity-90 transition`}
  >
    {text}
  </button>
);

export default Button;
import React from 'react';

const FormField = ({ label, type, name, value, onChange }) => (
  <label className="block">
    <span className="block font-semibold">{label}:</span>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border focus:ring-primary focus:border-primary"
    />
  </label>
);

export default FormField;
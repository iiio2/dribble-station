import React from 'react';

const Input = (props) => {
  return (
    <input
      type={props.type}
      className='form-control'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default Input;

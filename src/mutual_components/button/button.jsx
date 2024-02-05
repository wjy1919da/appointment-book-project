import React from 'react';

// scss
import './button.scss';

const FormButton = ({
  buttonName,
  onClick,
  className,
  icon,
  rotateIcon = false,
}) => {
  return (
    <button
      type='submit'
      className={className}
      onClick={onClick}
    >
      {icon && rotateIcon && (
        <img
          src={icon}
          alt='Icon-Button'
          style={{
            transform: 'rotate(180deg)',
            marginRight: '10px',
            width: '20px',
            height: '20px',
          }}
        />
      )}
      {icon && !rotateIcon && (
        <img
          src={icon}
          alt='Icon-Button'
          style={{
            marginLeft: '10px',
            width: '20px',
            height: '20px',
          }}
        />
      )}
      {buttonName}
    </button>
  );
};

export default FormButton;

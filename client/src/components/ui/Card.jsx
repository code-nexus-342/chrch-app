import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  hover = true,
  ...props 
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 overflow-hidden';
  
  const variants = {
    default: 'bg-white shadow-lg border border-gray-100',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-glass',
    dark: 'bg-dark-lighter border border-white/5 shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-white/50 shadow-lg',
    primary: 'bg-primary text-white shadow-lg shadow-primary/20',
    outline: 'bg-transparent border border-gray-200'
  };

  const hoverStyles = hover 
    ? 'hover:-translate-y-1 hover:shadow-xl' 
    : '';

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

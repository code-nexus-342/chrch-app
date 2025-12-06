import React from 'react';

const Section = ({ 
  children, 
  id, 
  className = '', 
  containerClassName = '',
  background = 'white'
}) => {
  const backgrounds = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-indigo-600 text-white'
  };

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 ${backgrounds[background] || background} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-6 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;

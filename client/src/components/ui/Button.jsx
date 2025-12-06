import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href,
  to,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 hover:border-primary-dark hover:text-primary-dark',
    ghost: 'text-dark hover:bg-light-muted/10',
    white: 'bg-white text-primary hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-glow-md hover:-translate-y-0.5 border border-transparent'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

import classes from './GreenButton.module.css';

interface IGreenButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  mode?: "modal";
}

const GreenButton: React.FC<IGreenButton> = ({
  mode,
  children,
  ...props
}) => {
  const multiClasses = [classes.greenBtn];
  
  if (props.className) {
    multiClasses.push(props.className);
  }
  if (mode === 'modal') {
    multiClasses.push(classes.modalMode);
  }
  return (<button  {...props} className={multiClasses.join(' ')}>
    {children}
  </button>)
}

export default GreenButton;
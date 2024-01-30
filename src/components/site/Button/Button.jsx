import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
const Button = ({ className = '', children, ...props }) => {
  return (
    <>
      <button class={clsx('btn btn-primary btn-default btn-squared ', className)} {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;

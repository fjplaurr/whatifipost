import * as React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  backgroundFull?: boolean;
  text: string;
  color: 'blue' | 'red';
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = ({
  backgroundFull = false, text, color, type = 'button', onClick,
}: ButtonProps) => {
  let style = '';
  if (backgroundFull && color === 'blue') {
    style = styles.fullBlueButton;
  }
  if (backgroundFull && color === 'red') {
    style = styles.fullRedButton;
  }
  if (!backgroundFull && color === 'blue') {
    style = styles.emptyBlueButton;
  }
  if (!backgroundFull && color === 'red') {
    style = styles.emptyRedButton;
  }
  return (
    <button
      type={type}
      className={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

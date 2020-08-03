import React, { useState, ReactNode } from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
  type: 'text' | 'email' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
  children?: ReactNode;
  color?: 'white' | 'smokeWhite';
}

const TextInput = ({
  type, onChange, placeholder, minLength, children, color = 'smokeWhite',
}: TextInputProps) => {
  const [value, setValue] = useState('');
  const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange && onChange(event);
    setValue(event.target.value);
  };
  const inputClass = color === 'white' ? styles.inputWhite : styles.inputSmokeWhite;
  return (
    <div className={styles.textInputWrapper}>
      {children && children}
      <input
        className={inputClass}
        placeholder={placeholder}
        required
        onChange={stateChange}
        value={value}
        type={type}
        minLength={minLength}
      />
    </div>
  );
};

export default TextInput;

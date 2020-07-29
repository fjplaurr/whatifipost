import React, { useState, ReactNode } from 'react';
import styles from './TextInput.module.scss';
import { Search } from '../../assets/icons';


type TextInputProps = {
  type: 'text' | 'email' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
  children?: ReactNode;
}

const TextInput = ({
  type, onChange, placeholder, minLength, children,
}: TextInputProps) => {
  const [value, setValue] = useState('');
  const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange && onChange(event);
    setValue(event.target.value);
  };
  return (
    <div className={styles.textInputWrapper}>
      {children && children}
      <input
        className={styles.input}
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

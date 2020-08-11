import React, { useState, useEffect } from 'react';
import styles from './TextInputSettings.module.scss';

type TextInputSettingsProps = {
  type: 'text' | 'email' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  minLength?: number;
  initialValue?: string;
  idInput: string,
  textLabel: string,
  maxLength?: number,
}

const TextInputSettings = ({
  type, onChange, placeholder, minLength,
  initialValue, idInput, textLabel, maxLength,
}: TextInputSettingsProps) => {
  const [value, setValue] = useState('');

  // Sets initial value if it is provided
  useEffect(() => {
    initialValue && setValue(initialValue);
  }, [initialValue]);

  const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange && onChange(event);
    setValue(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <label
          className={styles.label}
          htmlFor={idInput}
        >
          {textLabel}
        </label>
        <input
          id={idInput}
          className={styles.input}
          placeholder={placeholder}
          required
          onChange={stateChange}
          value={value}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    </>
  );
};

export default TextInputSettings;

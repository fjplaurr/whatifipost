import React, {
  useState, useRef, useEffect,
} from 'react';
import styles from './TextInput.module.scss';

type TextInputProps = {
  type: 'text' | 'email' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minLength?: number;
  color?: 'white' | 'smokeWhite';
  idInput: string;
}

const TextInput = ({
  type, onChange, placeholder, minLength, color = 'smokeWhite', idInput,
}: TextInputProps) => {
  const [value, setValue] = useState('');
  const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange && onChange(event);
    setValue(event.target.value);
  };

  // Refes for label and input elements.
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Changes label's className to be able to put it on top of the input when it is
  // not focused but contains data writen by the user.
  useEffect(() => {
    if (inputRef.current?.value) {
      // labelRef!.current!.className = `${styles.label} ${styles.labelOnTop}`;
    } else {
      labelRef!.current!.className = `${styles.label}`;
    }
  }, [value]);

  return (
    <div className={styles.textInputWrapper}>
      <input
        className={color === 'white' ? styles.inputWhite : styles.inputSmokeWhite}
        required
        onChange={stateChange}
        value={value}
        type={type}
        minLength={minLength}
        ref={inputRef}
        id={idInput}
      />
      <label
        ref={labelRef}
        htmlFor={idInput}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;

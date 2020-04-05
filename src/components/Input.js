import React, {useState} from 'react';
import Styles from 'styles/Input.css';

export default function Input ({label, ...rest}) {

  const [focused, setFocused] = useState(false);

  function focus() {
    setFocused(true);
  };

  function blur() {
    setFocused(false);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.label}>{label}</div>
      <input 
        className={!focused ? Styles.input : [Styles.input, Styles.focused].join(' ')} 
        onFocus={focus} 
        onBlur={blur} 
        {...rest} 
        />
    </div>
  );
};
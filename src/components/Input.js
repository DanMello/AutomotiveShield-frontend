import React, {useState} from 'react';
import Styles from 'styles/Input.css';

export default function Input ({label, type, ...rest}) {

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
      {type === 'textarea' ? 
        <textarea
          className={!focused ? Styles.textarea : [Styles.textarea, Styles.focused].join(' ')} 
          onFocus={focus}
          onBlur={blur}
          {...rest} 
        />
        :
        <input 
          className={!focused ? Styles.input : [Styles.input, Styles.focused].join(' ')} 
          onFocus={focus} 
          onBlur={blur}
          type={type}
          {...rest} 
          />
      }
    </div>
  );
};
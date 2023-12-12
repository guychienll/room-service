import * as React from 'react';
import styles from './button.scss';

const Button: React.FC = () => {
  return (
    <button data-testid="button" className={styles.button}>
      click
    </button>
  );
};

export default Button;

import React from 'react';
import styles from './styles.module.css';

function Card({ item }) {
  const { label, href } = item;

  return (
    <div className={styles.card}>
      <a href={href} className={styles.cardLink}>
        {label}
      </a>
    </div>
  );
}

export default Card;

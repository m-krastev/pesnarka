import React from 'react';
import styles from './GroupingToggle.module.css';

function GroupingToggle({ activeGroupType, setActiveGroupType }) {
  return (
    <div className={styles.toggleContainer}>
      <button
        onClick={() => setActiveGroupType('numerical')}
        className={`${styles.toggleButton} ${activeGroupType === 'numerical' ? styles.toggleButtonActive : ''}`}
      >
        По номера
      </button>
      <button
        onClick={() => setActiveGroupType('alphabetical')}
        className={`${styles.toggleButton} ${activeGroupType === 'alphabetical' ? styles.toggleButtonActive : ''}`}
      >
        По азбучен ред
      </button>
    </div>
  );
}

export default GroupingToggle;

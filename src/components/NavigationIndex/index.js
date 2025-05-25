import React from 'react';
import styles from './NavigationIndex.module.css';

// Bulgarian alphabet for navigation (moved here as it's specific to this component's logic)
const bulgarianAlphabet = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я'
];

function NavigationIndex({ activeGroupType, sortedRanges, groupedItemsAlphabetical }) {
  return (
    <nav className={styles.navContainer}>
      {activeGroupType === 'numerical' && (
        sortedRanges.map((range) => (
          <a
            key={range}
            href={`#${range}`}
            className={styles.navLink}
          >
            {range}
          </a>
        ))
      )}

      {activeGroupType === 'alphabetical' && (
        bulgarianAlphabet.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className={`${styles.navLink} ${groupedItemsAlphabetical[letter] ? '' : styles.navLinkInactive}`}
          >
            {letter}
          </a>
        ))
      )}
    </nav>
  );
}

export default NavigationIndex;

import React from 'react';
import styles from "./styles.module.css";

export default function SortListButton({alphaSort, callback}) {
    return (
        <>
            <button 
            onClick={callback} 
            className={styles.changeSort}>
                {alphaSort ? "По заглавие" : "По номера"}
            </button>
        </>
    );
};
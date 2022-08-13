import useIsBrowser from '@docusaurus/useIsBrowser';
import React from 'react';
import styles from "./styles.module.css";

// BUG: On mobile, the button appears next to logo text rather than side menu
export default function SortListButton() {
    if(!useIsBrowser()) return (<></>);
    let alphaSort = JSON.parse(window.localStorage.getItem("sort")) ?? false;
    return (
        <>
            <button 
            onClick={() => { alphaSort = !alphaSort; window.localStorage.setItem("sort", alphaSort); document.location.reload()}} 
            className={styles.changeSort}>
                {alphaSort ? "По заглавие" : "По номера"}
            </button>
        </>
    );
};
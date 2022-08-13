import useIsBrowser from '@docusaurus/useIsBrowser';
import React from 'react';
import styles from "./styles.module.css";

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
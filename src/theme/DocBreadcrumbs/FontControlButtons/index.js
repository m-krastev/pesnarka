import React from 'react';
import clsx from 'clsx';
import {
    ThemeClassNames,
} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function incrementFactor() {
    const doc = document.querySelector(":root");
    var factor = parseFloat(getComputedStyle(doc).getPropertyValue("--custom-font-factor"));
    factor += 0.1;
    if (factor >= 0.5 && factor <= 2.0) {
        doc.style.setProperty('--custom-font-factor', factor);
        window.localStorage.setItem('fontSizeFactor',factor);
    }
}
function decrementFactor() {
    const doc = document.querySelector(":root");
    var factor = parseFloat(getComputedStyle(doc).getPropertyValue("--custom-font-factor"));
    factor -= 0.1;
    if (factor >= 0.5 && factor <= 2.0) {
        doc.style.setProperty('--custom-font-factor', factor);
        window.localStorage.setItem('fontSizeFactor',factor)
    }
}

// function changeFontFactor(factor){
//     if(factor >= 0.5 && factor <= 2.0){
//         const doc = document.querySelector(":root");
//         doc.style.setProperty('--custom-font-factor',factor);
//     }
// }

export function FontSizeButtons() {
    return (
        <React.Fragment>
            <span className={styles.fontControlButton} onClick={decrementFactor} aria-label="">a</span>
            |
            <span className={styles.fontControlButton} onClick={incrementFactor} aria-label="">A</span>
        </React.Fragment>
    )
}


function invertFontWeight() {
    const doc = document.querySelector(":root");
    var fontWeight = getComputedStyle(doc).getPropertyValue("--custom-font-weight");
    const button = document.getElementsByClassName(styles.fontBoldButton)[0];
    if (fontWeight === "bold") {
        doc.style.setProperty("--custom-font-weight", "normal");
        button.classList.replace(styles.bold, styles.outlined);
        window.localStorage.setItem('fontWeight',"normal")
    }
    else {
        doc.style.setProperty("--custom-font-weight", "bold");
        button.classList.replace(styles.outlined, styles.bold);
        window.localStorage.setItem('fontWeight',"bold")
    }

}

export function FontBoldButton() {
    const initialStyle = getComputedStyle(document.querySelector(":root")).getPropertyValue("--custom-font-weight") === "bold" ? styles.bold : styles.outlined

    return (
        <span className={clsx(styles.fontControlButton, styles.fontBoldButton, initialStyle)} onClick={invertFontWeight} aria-label="">A</span>
    )
}

function changeLineHeight(){
    const doc = document.querySelector(":root")
    var lineHeight = parseFloat(getComputedStyle(doc).getPropertyValue("--custom-line-height"));
    switch(lineHeight){
        case 1.5:
            lineHeight = 2.0
            break;
        case 2.0:
            lineHeight = 1.20;
            break;
        case 1.20:
            lineHeight = 1.5;
            break;
        default:
            lineHeight = 1.5;
            break;
    }
    doc.style.setProperty("--custom-line-height",lineHeight);
    window.localStorage.setItem('lineHeight',lineHeight)
}

export function LineHeightButton(){
    return(
        <span className={clsx(styles.fontControlButton,styles.lineHeightButton)} onClick={changeLineHeight}>
           <svg xmlns="http://www.w3.org/2000/svg" aria-label="">
            <path d="M12 40.05 4 32.05 6.1 29.95 10.5 34.25V13.85L6.1 18.15L4 16.05L12 8.05L20 16.05L17.9 18.15L13.5 13.85V34.25L17.9 29.95L20 32.05ZM24 38V35H44V38ZM24 25.5V22.5H44V25.5ZM24 13V10H44V13Z"/>       
        </svg>          
        </span>


    )
}

function LoadFontSettingsFromLocalStorage(){
    const style = getComputedStyle(document.querySelector(":root"))
    const storage = window.localStorage
    style.setProperty("--custom-line-height",storage.getItem("lineHeight"))
    style.setProperty("--custom-font-weight",storage.getItem("fontWeight"))
    style.setProperty("--custom-font-factor",storage.getItem("fontSizeFactor"))
    console.log("styles loaded")
}

export default function FontControlButtons() {
    return (
            <div
                className={clsx(
                    ThemeClassNames.docs.docBreadcrumbs,
                    styles.fontControlBar,
                )}
                aria-label="">
                <FontSizeButtons /> | <FontBoldButton /> | <LineHeightButton/>
            </div>

    )

}

import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import useIsBrowser from '@docusaurus/useIsBrowser';


export default function DocSidebarWrapper(props) {
    if(!useIsBrowser()) {return (<DocSidebar {...props} />)}
    const alphaSort = JSON.parse(window.localStorage.getItem("sort")) ?? false;

    const props_new = props

    if (alphaSort === true) props_new.sidebar.sort((a, b) => 
        a.label.includes(".") && b.label.includes(".") ? (a.label.split(".")[1].trim()).localeCompare(b.label.split(".")[1].trim()) : 0
    )
    else props_new.sidebar.sort((a, b) => a.docId - b.docId)

    return (
        <>
            <DocSidebar {...props_new} />
        </>
    );
}

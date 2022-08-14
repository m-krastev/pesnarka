import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';
import SortSidebarButton from '@site/src/components/NavbarItems/SortSidebarButton';
import { indexedSort, alphabeticalDiscardIndexSort } from '@site/src/js/';


function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();

  let alphaSort = false
  try {
      alphaSort = JSON.parse(window.localStorage.getItem("sort")) ?? false;
  } catch (error) {
  }

  const new_sidebar = alphaSort === true ? alphabeticalDiscardIndexSort(sidebar) : indexedSort(sidebar);

  const buttonProps = {
      alphaSort: alphaSort,
      callback: () => {
          alphaSort = !alphaSort
          window.localStorage.setItem("sort", alphaSort);
          window.location.reload()
      }
  }

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}>
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}

      <SortSidebarButton {...buttonProps} />

      <Content path={path} sidebar={new_sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}
export default React.memo(DocSidebarDesktop);

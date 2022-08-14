import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import SortSidebarButton from '@site/src/components/NavbarItems/SortSidebarButton';
import { indexedSort, alphabeticalDiscardIndexSort } from '@site/src/js/';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();

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
    <>
      <SortSidebarButton {...buttonProps} />

      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={new_sidebar}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>

  );
};
function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
export default React.memo(DocSidebarMobile);

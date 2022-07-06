import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectLayout, toggleSiderBar } from 'features/layout/layoutSlice';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './hambuger.module.css';

const Hamburger = () => {
  const layout = useAppSelector(selectLayout);
  const dispatch = useAppDispatch();
  return (
    <div
      className={styles.hamburgerContainer}
      onClick={() => dispatch(toggleSiderBar())}
    >
      {layout.sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};

export default Hamburger;

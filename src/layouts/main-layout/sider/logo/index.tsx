import React from 'react';
import logo from 'assets/logo.svg';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <div className={styles.sidebarLogoContainer}>
      <img src={logo} className={styles.sidebarLogo} alt="logo" />
      <h1 className={styles.sidebarTitle}>HIAS</h1>
    </div>
  );
};

export default Logo;

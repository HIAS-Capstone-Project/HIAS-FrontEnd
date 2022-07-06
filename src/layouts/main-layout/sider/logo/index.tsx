import React from 'react';
import logo192 from 'assets/logo192.png';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <div className={styles.sidebarLogoContainer}>
      <img src={logo192} className={styles.sidebarLogo} alt="logo" />
      <h1 className={styles.sidebarTitle}>HIAS</h1>
    </div>
  );
};

export default Logo;

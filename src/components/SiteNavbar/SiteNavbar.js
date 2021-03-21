import { Home } from '@material-ui/icons';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import styles from './SiteNavbar.module.css';

const SiteNavbar = () => (
  <div className={styles.SiteNavbar}>
    <Navbar variant="dark" bg="dark">
      <Navbar.Brand href="#home">
        <Home></Home>
        Home
      </Navbar.Brand>
    </Navbar>
  </div>
);

SiteNavbar.propTypes = {};

SiteNavbar.defaultProps = {};

export default SiteNavbar;

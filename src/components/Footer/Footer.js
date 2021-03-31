import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './footerStyle.module.css';
import { faGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons';


function Footer() {
       return (
        <div className = {styles.footer}>
               <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} className = {styles.footerIcon} /></a>
               <a href="https://github.com/Arusg" target="_blank" rel="noreferrer" ><FontAwesomeIcon icon={faGithub} className = {styles.footerIcon} /></a>
        </div>
    );
};



export default Footer;
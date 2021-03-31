import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {logout} from '../../helpers/auth'
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';

function NavMenu({ isAuthenticated }) {
       return (
        <Navbar bg="dark" variant="dark">
            <Nav className={styles.header}>
                <div className = {styles.pagesMenu}>
            {
                isAuthenticated &&
                <NavLink
                    to='/'
                    activeClassName={styles.active}
                    exact
                    className="mr-3"
                >
                    Home
                </NavLink>
            }
                <NavLink
                    to='/about'
                    activeClassName={styles.active}
                    exact
                    className="mr-3"
                >
                    About us
                </NavLink>
                <NavLink
                    to='/contact'
                    activeClassName={styles.active}
                    exact
                    className="mr-3"
                >
                    Contact us
                </NavLink>
                </div>
            <div className = {styles.menu}> 
                {
                
          isAuthenticated ? 
         <Button variant="outline-primary" className={styles.logout} onClick = {logout}>Log out </Button> :
          <>
                <NavLink
                    to='/login'
                    activeClassName={styles.active}
                    exact
                    className="mr-3"
                >
                    Login
                </NavLink>

                <NavLink
                    to='/register'
                    activeClassName={styles.active}
                    exact
                >
                    Register
                </NavLink>
                </>
                
            }
            </div>
            </Nav>
        </Navbar>
    );
};

const mapStateToProps = (state)=>{
return {
  isAuthenticated: state.isAuthenticated
}
};

export default connect(mapStateToProps)(NavMenu);
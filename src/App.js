import React, {useEffect} from 'react';
import './App.css';
import ToDo from './components/pages/ToDo/toDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';

import { Router, Route, Switch, Redirect} from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';

function App({loading,successMessage, errorMessage}) {
   useEffect(()=>{
    if(successMessage){
      toast.success(successMessage, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
    }

    if(errorMessage){
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
    }
    
  }, [successMessage, errorMessage]);


  return (
    <div className="App">

      <Router history={history}>
        <NavMenu />

        <Switch>
          <Route
            path='/'
            component={ToDo}
            exact={true}
          />
          <Route
            path='/home'
            component={ToDo}
            exact={true}
          />
          <Route
            path='/about'
            component={About}
            exact={true}
          />
          <Route
            path='/contact'
            component={Contact}
            exact
          />
          <Route 
            path='/task/:taskId'
            component = {SingleTask}
            exact


          />

          <Route
            path='/not-found'
            component={NotFound}
            exact
          />

          <Redirect to='/not-found' />
        </Switch>

      </Router>
      { loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage
  };
};

export default connect(mapStateToProps)(App);

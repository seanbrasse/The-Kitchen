import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  AccountSettings,
  CreateAccount,
  Login,
  ResetPassword,
  Feed,
  Profile,
  EditRecipe,
  ViewRecipe,
  Search
} from 'pages';
import {Navbar} from 'components';
import styles from './App.module.css';

export default function App() {
  // TODO: Implement catchall error page
  
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path={['/', '/login', '/create-account', '/reset-password', '/change-password']}></Route>
          <Route>
            <Navbar/>
          </Route>
        </Switch>
        <Switch>
          <Route exact path={['/', '/login']}>
            <Login/>
          </Route>
          <Route exact path='/create-account'>
            <CreateAccount/>
          </Route>
          <Route exact path='/reset-password'>
            <ResetPassword/>
          </Route>
          <Route exact path='/reset-password'>
            <ResetPassword/>
          </Route>
          <Route exact path='/feed'>
            <Feed/>
          </Route>
          <Route exact path='/search'>
            <Search/>
          </Route>
          <Route exact path='/user/:userID'>
            <Profile/>
          </Route>
          <Route exact path='/settings'>
            <AccountSettings/>
          </Route>
          <Route exact path='/recipe/create'>
            <EditRecipe/>
          </Route>
          <Route exact path='/recipe/:recipeID'>
            <ViewRecipe/>
          </Route>
          <Route exact path='/recipe/:recipeID/edit'>
            <EditRecipe/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

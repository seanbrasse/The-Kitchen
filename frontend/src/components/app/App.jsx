import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  AccountSettings,
  CreateAccount,
  ForgotPassword,
  Login,
  ResetPassword,
  FinalizeAccount,
  Feed,
  Profile,
  EditRecipe,
  ViewRecipe,
  Search
} from 'pages';
import {Navbar} from 'components';
import styles from './App.module.css';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function AuthenticatedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render = { () =>
        sessionStorage.getItem('userID') ? children : <Redirect to="/login"/>
      }
    />
  );
}

// A wrapper for <Route> that redirects to the feed
// screen if you're already authenticated.
function LoginRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render = { () =>
        !sessionStorage.getItem('userID') ? children : <Redirect to="/feed"/>
      }
    />
  );
}

export default function App() {
  // TODO: Implement catchall error page
  
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path={['/', '/login', '/create-account', '/reset-password', '/change-password', '/forgot-password', '/finalize-account']}></Route>
          <Route>
            <Navbar/>
          </Route>
        </Switch>
        <Switch>
          <LoginRoute exact path={['/', '/login']}>
            <Login/>
          </LoginRoute>
          <LoginRoute exact path='/create-account'>
            <CreateAccount/>
          </LoginRoute>
          <Route exact path='/forgot-password'>
            <ForgotPassword/>
          </Route>
          <LoginRoute exact path='/reset-password'>
            <ResetPassword/>
          </LoginRoute>
          <LoginRoute exact path='/finalize-account'>
            <FinalizeAccount/>
          </LoginRoute>
          <AuthenticatedRoute exact path='/feed'>
            <Feed/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/search'>
            <Search/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/user/:userID'>
            <Profile/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/settings'>
            <AccountSettings/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/recipe/create'>
            <EditRecipe/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/recipe/:recipeID'>
            <ViewRecipe/>
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path='/recipe/:recipeID/edit'>
            <EditRecipe/>
          </AuthenticatedRoute>
        </Switch>
      </Router>
    </div>
  );
}

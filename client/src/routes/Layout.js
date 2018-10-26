import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <ViewerContext.Consumer>
    {({ user }) => {
      console.log(user);
      return (
        <Fragment>
          {/* @TODO: Add your menu component here */}
          <NavBar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/share" component={Share} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/home" />
          </Switch>
        </Fragment>
      );
    }}
  </ViewerContext.Consumer>
);

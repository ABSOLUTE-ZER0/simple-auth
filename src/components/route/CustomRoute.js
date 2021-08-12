import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const CustomRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.loggedIn === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}></Route>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CustomRoute);

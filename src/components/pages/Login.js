import { Link } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Alert, InputGroup } from "react-bootstrap";

const Login = ({ loginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState("");

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const displayAlert = (message) => {
    setAlert(message);

    setTimeout(function () {
      setAlert("");
    }, 5000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(user);
    res && displayAlert(res.error);
  };

  return (
    <div className='login'>
      <div className='login__image'></div>

      <div className='login__body'>
        <input type='hidden' value='something' />
        <form className='login__body-form'>
          <h3 className='login__title text-shadow-smooth'> Login </h3>
          {alert && (
            <Alert variant='danger' dismissible>
              {alert}
            </Alert>
          )}
          <div>
            <span style={{ fontSize: "1.25rem" }}>
              Dont have an account?
              <Link to={`/signup`}> Sign Up </Link>
            </span>
          </div>
          <div className='login__input-div'>
            <i className='far fa-envelope' />
            <input
              className='login__input'
              type='email'
              name='email'
              autoFocus
              onChange={handleInput}
              placeholder='Email'
              value={user.email}
              autoComplete='off'
            />
          </div>
          <div className='login__input-div'>
            <i className='fas fa-lock' />
            <input
              className='login__input'
              type='password'
              name='password'
              onChange={handleInput}
              placeholder='Password'
              value={user.password}
              autoComplete='new-password'
            />
          </div>
          <button
            onClick={onSubmit}
            type='submit'
            className='login__button box-shadow'>
            Login
          </button>
          <div className='login__forgot'>
            <InputGroup>
              <InputGroup.Checkbox />
              <h5>Remember Me</h5>
            </InputGroup>

            <span>
              <Link to={`/login/forgot`}> Forgot Password ? </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, {
  loginUser,
})(Login);

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/authActions";
import { Alert, InputGroup } from "react-bootstrap";

const Signup = ({ addUser }) => {
  const [alert, setAlert] = useState("");

  useEffect(() => {
    document
      .querySelector(".login__input[name='mobile']")
      .addEventListener("keypress", function (evt) {
        if (
          evt.which !== 8 &&
          evt.which !== 0 &&
          (evt.which < 48 || evt.which > 57)
        ) {
          evt.preventDefault();
        }
      });
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const displayAlert = (message) => {
    setAlert(message);

    setTimeout(function () {
      setAlert("");
    }, 5000);
  };

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const finalUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
    };

    if (user.password !== user.confirmPassword) {
      displayAlert("Confirm password does not match");
    } else {
      const res = await addUser(finalUser);
      if (res) {
        displayAlert(res.error);
      }
    }
  };

  return (
    <div className='login'>
      <div className='login__image'></div>

      <div className='login__body'>
        <input type='hidden' value='something' />
        <form className='login__body-form'>
          <h3 className='login__title text-shadow-smooth'> Signup </h3>
          {alert && (
            <Alert variant='danger' dismissible>
              {alert}
            </Alert>
          )}

          <div>
            <span style={{ fontSize: "1.25rem" }}>
              Have an account?
              <Link to={`/login`}> Log In </Link>
            </span>
          </div>

          <div className='login__input-div'>
            <i className='fas fa-user' />
            <input
              className='login__input'
              autoFocus
              type='text'
              name='name'
              onChange={handleInput}
              placeholder='Name *'
              value={user.name}
              autoComplete='none'
            />
          </div>

          <div className='login__input-div'>
            <i className='far fa-envelope' />
            <input
              className='login__input'
              type='email'
              name='email'
              onChange={handleInput}
              placeholder='Email *'
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
              placeholder='Password *'
              value={user.password}
              autoComplete='new-password'
            />
          </div>

          <div className='login__input-div'>
            <i className='fas fa-lock' />
            <input
              className='login__input'
              type='password'
              name='confirmPassword'
              onChange={handleInput}
              placeholder='Confirm Password *'
              value={user.confirmPassword}
              autoComplete='new-password'
            />
          </div>

          <div className='login__input-div'>
            <i className='fas fa-mobile-alt' />
            <input
              className='login__input'
              type='number'
              name='mobile'
              onChange={handleInput}
              placeholder='Phone Number *'
              value={user.mobile}
              autoComplete='new-password'
            />
          </div>
          <button
            onClick={onSubmit}
            type='submit'
            className='login__button box-shadow'>
            Signup
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

Signup.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, {
  addUser,
})(Signup);

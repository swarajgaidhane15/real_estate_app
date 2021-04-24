import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../actions/auth";
import { setAlert } from "../actions/alert";

const Signup = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2)
      dispatch(setAlert("Password do not match", "error"));
    else {
      dispatch(signup({ name, email, password, password2 }));
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="auth">
      <Helmet>
        <title>Property - Signup</title>
        <meta name="description" content="signup page" />
      </Helmet>

      <h1 className="auth__title">Signup</h1>

      <p className="auth__lead">Create your Account</p>

      <form className="auth__form" onSubmit={onSubmit}>
        <div className="auth__form__group">
          <input
            type="text"
            className="auth_form__input"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className="auth__form__group">
          <input
            type="email"
            className="auth_form__input"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="auth__form__group">
          <input
            type="password"
            className="auth_form__input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
            required
          />
        </div>

        <div className="auth__form__group">
          <input
            type="password"
            className="auth_form__input"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength={6}
            required
          />
        </div>

        <button className="auth__form__button">Register</button>
      </form>

      <p className="auth__authtext">
        Already have an account?{" "}
        <Link className="auth__authtext__link" to="/login">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;

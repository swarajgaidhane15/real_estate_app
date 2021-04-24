import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../actions/auth";

const Signin = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="auth">
      <Helmet>
        <title>Property - Login</title>
        <meta name="description" content="login page" />
      </Helmet>

      <h1 className="auth__title">Signin</h1>

      <p className="auth__lead">Signin to your Account</p>

      <form className="auth__form" onSubmit={onSubmit}>
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

        <button className="auth__form__button">Login</button>
      </form>

      <p className="auth__authtext">
        Don't have an account?{" "}
        <Link className="auth__authtext__link" to="/signup">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Signin;

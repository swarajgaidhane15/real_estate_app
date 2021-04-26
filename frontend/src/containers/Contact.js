import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alert";
import Loader from "react-loader-spinner";

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = formData;

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .post(
        `http://localhost:8000/api/contacts/`,
        { name, email, subject, message },
        config
      )
      .then((res) => {
        dispatch(setAlert("Message Sent", "success"));
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        dispatch(setAlert("Error with Sending Message", "error"));
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className="contact">
      <Helmet>
        <title>Property - Contact</title>
        <meta name="description" content="Contact us" />
      </Helmet>
      <form className="contact__form" onSubmit={onSubmit}>
        <label className="contact__form__label" htmlFor="name">
          Name*
        </label>
        <input
          className="contact__form__input"
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={onChange}
          value={name}
          required
        />
        <label className="contact__form__label" htmlFor="email">
          Email*
        </label>
        <input
          className="contact__form__input"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={onChange}
          value={email}
          required
        />
        <label className="contact__form__label" htmlFor="subject">
          Subject*
        </label>
        <input
          className="contact__form__input"
          name="subject"
          type="text"
          placeholder="Buying Home"
          onChange={onChange}
          value={subject}
          required
        />
        <label className="contact__form__label" htmlFor="message">
          Message
        </label>
        <textarea
          className="contact__form__textarea"
          name="message"
          cols="30"
          rows="10"
          placeholder="Message"
          onChange={onChange}
          value={message}
        />
        {loading ? (
          <div className="contact__form__loader">
            <Loader type="Oval" color="#424242" height={50} width={50} />
          </div>
        ) : (
          <button className="contact__form__button" htmltype="submit">
            Send
          </button>
        )}
      </form>
    </div>
  );
};

export default Contact;

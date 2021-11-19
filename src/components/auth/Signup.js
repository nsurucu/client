import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Signup({ isAuthenticated, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://example-backe.herokuapp.com/api/auth/signup', { username, password });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }

    setUsername('');
    setPassword('');
    setErrorMessage('');
    setMessage('Sign up successful');
    await timeout(1000);
    history.push("/");
  }

  useEffect(() => {
    setMessage('')
  }, [username, password])

  const showMessage = () => {
    if (message === '') {
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div>
  }

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>

   

        <div className="form-group row">
          <label>Username</label>
          <div class="col-xs-2">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-control">
          </input>
          </div>
        </div>
        <div className="form-group row">
          <label>Password</label>
          <div class="col-xs-2">
          <input
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            className="form-control">
          </input>
          </div>
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
  )
}

export default Signup;
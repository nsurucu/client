import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 

function AddTodo({isAuthenticated, setIsAuthenticated}) {
	const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  useEffect(() => {
		if(!isAuthenticated){
			history.push("/");
		}
	}, [isAuthenticated, history])

	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://example-backe.herokuapp.com/api/todo', {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }
    
    setTitle('');
    setTargetDate('');
    setErrorMessage('');
    setMessage('Todo successfully created');
  }

  useEffect(() => {
    setMessage('')
  }, [title, targetDate])

  const showMessage = () => {
    if(message === ''){
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div> 
  }

  const showErrorMessage = () => {
    if(errorMessage === ''){
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
          <label>job</label>
          <div class="col-xs-2">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            
            className="form-control">
          </input>
          </div>
        </div>
        <div className="form-group row">
          <label>Date</label>
          <div class="col-xs-2">
          <input 
            value={targetDate} 
            type="date" 
            onChange={e => setTargetDate(e.target.value)} 
            className="form-control">
          </input>
          </div>
        </div>
        <button className="btn btn-primary">Add Todo</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
	)
}

export default AddTodo;
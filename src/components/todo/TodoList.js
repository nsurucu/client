import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useHistory } from "react-router-dom";

function TodoList({ isAuthenticated, setIsAuthenticated }) {
	const [todos, setTodos] = useState([]);
	const [changed, setChanged] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [inputPageNumber, setInputPageNumber] = useState(pageNumber);
	const [inputPageSize, setInputPageSize] = useState(pageSize);
	const [filter, setFilter] = useState("All");
	let history = useHistory();

	useEffect(() => {
		if (!isAuthenticated) {
			history.push("/");
		}
	}, [isAuthenticated, history])

	useEffect(() => {
		const loadData = async () => {
			let response = null;
			try {
				let url = `http://localhost:8080/api/todo/${pageNumber - 1}/${pageSize}`;


				response = await axios.get(url, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`, } });
			} catch (error) {
				if (error.response) {
					setErrorMessage(error.response.data.message);
				} else {
					setErrorMessage('Error: something happened');
				}
				return;
			}
			setErrorMessage('');
			setTodos(response.data);
		}

		loadData();
	}, [changed, pageNumber, pageSize, filter])


	const deleteTodo = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/todo/${id}`, {
				headers: {
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			});
		} catch (error) {
			if (error.response) {
				setErrorMessage(error.response.data.message);
			} else {
				setErrorMessage('Error: something happened');
			}
			return;
		}
		setErrorMessage('');
		setChanged(!changed);
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

			{showErrorMessage()}



			<table className="table">
				<thead>
					<tr>
						
						<th> Date</th>
						<th>job</th>
						<th> </th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{
						todos.map((todo) => {
							return <tr className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
								
								<td>{moment(todo.targetDate).format('ll')}</td>
								<td>{todo.title}</td>								
								<td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
								<td><Link to={{ pathname: `/update/${todo.id}` }}><button className="btn btn-primary">Update</button></Link></td>
							</tr>
						})
					}
				</tbody>
			</table>


		</div>
	);
}

export default TodoList;
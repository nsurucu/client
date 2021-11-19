import React from 'react';
import { Link } from 'react-router-dom';

function Header({isAuthenticated, setIsAuthenticated}) {
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
        
        <ul className="navbar-nav justify-content-start container">
          {!isAuthenticated && <li className="nav-link px-4"><Link to='/signin'>Signin</Link></li>}
          {!isAuthenticated && <li className="nav-link px-4"><Link to='/signup'>Signup</Link></li>}
          {isAuthenticated && <li className="nav-link px-4"><Link to='/signout'>Signout</Link></li>}
          {isAuthenticated && <li className="nav-link px-4"><Link to='/todo'>Todo List</Link></li>}
          {isAuthenticated && <li className="nav-link px-4"><Link to='/add'>Add new todo</Link></li>}
        
         
        </ul>
      </nav>
		</header>
	)
}

export default Header;
import { Link, NavLink, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import { getItemFromLocalStorage } from '../helpers/localStorageFunc';
import { doFetch } from '../helpers/useFetch';

const NavBar = () => {
	const favorites = useSelector((state) => state.favorite);
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	let userToken = getItemFromLocalStorage("token");
	const history = useHistory();
	const favoritesIds = [];

	useEffect(() => {
		userToken = getItemFromLocalStorage("token");
	}, [user])

	const onLogout = () => {
		favorites.forEach((favorite) => {
			favoritesIds.push(favorite._id)
		})
		dispatch(userActions.saveUser());
		history.replace('/home');
	}

  return (
        <div className="navigation-wrap bg-light start-header start-style">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<nav className="navbar navbar-expand-md navbar-light">
						<div className="navbar-brand"><Link to="/home" className="titleNav">Idan&Ben Tours</Link></div>	
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto py-4 py-md-0">
								<li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<NavLink to="/home" className="nav-link dropdown-toggle">Home</NavLink>
								</li>
								{ !user.user.username && <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<NavLink to="/login" className="nav-link">Sign in</NavLink>
								</li>}
								{ user.user.username && <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<NavLink to='/' className="nav-link" onClick={onLogout}>Logout</NavLink>
								</li>}
								<li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
									<NavLink to="/favorites" className="nav-link dropdown-toggle">Favorites</NavLink>
								</li>
								<li className=" pl-4 pl-md-0 ml-0 ml-md-4">
									{user.user.username ? user.user.username : null}
								</li>
							</ul>
						</div>
					</nav>		
				</div>
			</div>
		</div>
	</div>
    );
}

export default NavBar

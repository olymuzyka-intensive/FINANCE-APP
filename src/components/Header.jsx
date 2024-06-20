import { Link } from "react-router-dom"

import React from "react";

import buttonBack from "/src/img/back.svg"

function Header(props) {
	let to = (props.to) ? props.to + "/" : "";
	let title = (props.title) ? props.title : "";

	return (
	<header className="header">

		<Link to={`/${to}`}>
		<svg className="back" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 2.07512L2 8.75755L10 15.2463" stroke="black" strokeWidth="2.5" strokeLinecap="round"/>
		</svg>

		{/* <img className="back" src={buttonBack} alt="back"/> */}


		{/* <img src="/src/img/back.svg"/> */}
		</Link>
		<h1>{title}</h1>

	</header>
	)
}

export default Header
import { useContext, useEffect } from "react"

import { AppContext } from "../App"

import Nav from "./Nav"

function Home() {
	const {cardsBalance} = useContext(AppContext);

	useEffect(() => {
		document.title = "Finance App"
	})

	return (
	<div className="page home">
		<div className="app__bg"></div>
		<div className="container">
			<div className="home__img"></div>
			<div className="home__balance">
				<h3>Balance</h3>
				<div className="home__balance_value">$ {cardsBalance.toFixed(2)}</div>
			</div>	
			<Nav/>

		</div>
	</div>
	)
}

export default Home
import { Link } from "react-router-dom"

function Nav() {
	return (
	<nav className="nav">
        <ul>
            <li className="nav__btn"><Link to="/transactions/">All transactions</Link></li>
            <li className="nav__btn"><Link to="/cards/">My cards</Link></li>
        </ul>
	</nav>
	)
}

export default Nav
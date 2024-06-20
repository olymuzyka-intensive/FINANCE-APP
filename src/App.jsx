import { createContext, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./components/Home"
import Cards from "./components/Cards"
import Transactions from "./components/Transactions"
import Transaction from "./components/Transaction"

import './css/style.css'
import './css/media.css'

export const AppContext = createContext();

function App() {
	const [cardLastId, setCardLastId] = useState(0)
	const [cardsBalance, setCardsBalance] = useState(0)
	const [dataCards, setDataCards] = useState([])

	const [transactionLastId, setTransactionLastId] = useState(0)
	const [transactionsCategories] = useState(['Food', 'Drinks', 'Rent', 'Auto', 'Other'])
	const [dataTransactions, setDataTransactions] = useState([])

	const getCardsBalance = () => {
		let balance = 0;

		dataCards.forEach((item) => {
			balance += +item.balance
		})

		return balance;
	}

	useEffect(() => {
		setCardsBalance(getCardsBalance())
	}, [dataCards])

	return (
	<div className="app">
		<AppContext.Provider value={
			{
				dataCards, setDataCards, cardLastId, setCardLastId, cardsBalance,
				transactionLastId, setTransactionLastId, dataTransactions, setDataTransactions,
				transactionsCategories
			}
		}>
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/cards/" element={<Cards/>} />
			<Route path="/transactions/" element={<Transactions/>} />
			<Route path="/transaction/:transaction_id/" element={<Transaction/>} />
		</Routes>
		</BrowserRouter>
		</AppContext.Provider>
	</div>
	)
}

export default App
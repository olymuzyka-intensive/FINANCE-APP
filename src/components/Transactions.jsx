import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { AppContext } from "../App"

import Header from "./Header"

function Transactions() {
	const {dataCards, setDataCards, transactionLastId, setTransactionLastId, dataTransactions, setDataTransactions, transactionsCategories} = useContext(AppContext)

	const [dataTransactionsFilter, setDataTransactionsFilter] = useState([]);

	const [transactionsForm, setTransactionsForm] = useState(null)

	// const [isActive, setIsActive] = useState();   //для переключения на активную категорию

	const formFieldTitle = useRef()
	const formFieldCost = useRef()
	const formFieldCategory = useRef()
	const formFieldType = useRef()
	const formFieldCard = useRef()
	const formFieldDesc = useRef()

	const transactionsAdd = () => {
		const title = formFieldTitle.current.value
		const cost = formFieldCost.current.value
		const category = formFieldCategory.current.value
		const type = formFieldType.current.value
		const card_id = formFieldCard.current.value
		const desc = formFieldDesc.current.value

		const numberPattern = /^\d+$/

		const card = dataCards.find((item) => +item.id == +card_id)

		if (!title || title.length == 0 || !cost || !cost.match(numberPattern) || !type || !card) {
			setTransactionsForm(null)
			return
		}
		
		if (type == 'out' && +card.balance < +cost) {
			setTransactionsForm(null)
			return
		}

		let newId = transactionLastId
		newId++

		const currentDate = new Date()

		const transaction = {
			id: newId,
			date: currentDate.toLocaleString(),
			title: title,
			cost: cost,
			category: category,
			type: type,
			card_id: card_id,
			description: desc
		}

		const dataTransactionsTmp = dataTransactions
		dataTransactionsTmp.push(transaction)

		setTransactionLastId(newId)
		setDataTransactions([...dataTransactionsTmp])
		setTransactionsForm(null)

		updateCardsBalance()
	}

	const transactionsShowForm = () => {
		const html = <div className="transactions__add_form">
			<h3>Add new transaction</h3>
			<div className="form">
				<div className="form__field">
					<h3>Cards: </h3>
					<select ref={formFieldCard}>
						{dataCards.map((item, index) => {
							return <option key={index} value={item.id}>{item.title}</option>
						})}
					</select>
				</div>
				<div className="form__field">
					<h3>Type transaction: </h3>
					<select ref={formFieldType}>
						<option value="in">Incoming</option>
						<option value="out">Outgoing</option>
					</select>
				</div>
				<div className="form__field">
					<h3>Transaction cost: </h3>
					<input ref={formFieldCost} type="text" placeholder="Transaction cost" />
				</div>
				<div className="form__field">
					<h3>Category: </h3>
					<select ref={formFieldCategory}>
						<option value="0"></option>
						{transactionsCategories.map((item, index) => {
							return <option key={index} value={index+1}>{item}</option>
						})}
					</select>
				</div>
				<div className="form__field">
					<h3>Transaction title: </h3>
					<input ref={formFieldTitle} type="text" placeholder="Transaction title" />
				</div>
				<div className="form__field">
					<h3>Description:</h3>
					<input ref={formFieldDesc} type="text" placeholder="Description" />
				</div>
				<button className="transactions__btn_send" onClick={transactionsAdd}></button>
			</div>
		</div>

		setTransactionsForm(html)
	}

	const updateCardsBalance = () => {
		const lastTransaction = dataTransactions[dataTransactions.length-1]

		if (!lastTransaction) return

		const card_id = lastTransaction.card_id;

		let dataCardsTmp = dataCards
		const cardTmp = dataCardsTmp.find((item) => +item.id == +card_id)

		if (lastTransaction.type == 'in') cardTmp.balance += +lastTransaction.cost
		else cardTmp.balance -= +lastTransaction.cost

		setDataCards([...dataCardsTmp])
	}

	const filter = (category_id) => {
		if (!category_id) {
			setDataTransactionsFilter([...dataTransactions])
			return
		}

		let dataTransactionsFilterTmp = dataTransactions.filter((item) => +item.category == +category_id)
		setDataTransactionsFilter([...dataTransactionsFilterTmp])
	}

	useEffect(() => {
		document.title = "All transactions"
	})

	useEffect(() => {
		setDataTransactionsFilter([...dataTransactions])

	}, [dataTransactions])


	return (
	<div className="page transactions">
		<div className="app__bg"></div>

		<div className="container">
		
			<Header title="All transactions" />
			
			<div className="transactions__add">
				{transactionsForm}
				<button onClick={transactionsShowForm} className="transactions__btn_add"></button>
			</div>

			{(dataTransactions.length > 0) ? 
				<ul className="transactions_categories__list">
					<li onClick={() => { filter(0) }} className="transactions_categories__item active">All</li>
					{transactionsCategories.map((item, index) => {
						return <li onClick={() => { filter(index+1)}} key={index} className="transactions_categories__item">{item}</li>
					})}
				</ul> 
			: ''}

			<ul className="transactions__list">
				{dataTransactionsFilter.map((item, index) => {
					return <li key={index} className="transactions__item">
						<div className="transaction__item_promo">
							<Link className="transaction__title" to={`/transaction/${item.id}/`}>{item.title}</Link>
							<div className="transaction__date">{item.date}</div>
						</div>
						<div className="transaction__value">{item.type == 'in' ? '+' : '-'}$ {item.cost}</div>
					</li>
				})}
			</ul>
		
		</div>
	</div>
	)
}

export default Transactions
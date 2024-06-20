import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"

import Header from "./Header"

import { AppContext } from "../App"

function Transaction() {
	const { transaction_id } = useParams();

	const {dataCards, dataTransactions, setDataTransactions, transactionsCategories} = useContext(AppContext)

	const [transaction, setTransaction] = useState(null)
	const [transactionForm, setTransactionForm] = useState(null)

	const formFieldTitle = useRef()
	const formFieldCategory = useRef()
	const formFieldDesc = useRef()

	let transactionTmp = dataTransactions.find((item) => +item.id == +transaction_id)
	let cardTmp = dataCards.find((item) => +item.id == +transactionTmp.card_id)
	let categoryName = transactionsCategories[transactionTmp.category-1]

	transactionTmp.card_title = cardTmp.title
	transactionTmp.category_name = categoryName

	const transactionEdit = () => {
		const title = formFieldTitle.current.value
		const category = formFieldCategory.current.value
		const desc = formFieldDesc.current.value

		let transactionTmp = dataTransactions.find((item) => +item.id == +transaction_id)
		
		transactionTmp.title = title
		transactionTmp.category = category
		transactionTmp.description = desc

		setDataTransactions([...dataTransactions])
		setTransactionForm(null)
	}

	const transactionRemove = () => {
		const dataTransactionsTmp = dataTransactions.filter((item) => +item.id != +transaction_id);

		setDataTransactions([...dataTransactionsTmp])
		location.href = '/transactions/' // ??????
	}

	const transactionShowForm = () => {
		const html = <div className="transaction__edit_form">
			<h3>Edit transaction</h3>

			<div className="form">
				<div className="form__field">
					<h3>Category: </h3>
					<div className="select">
					<select ref={formFieldCategory}>
						<option value="0"></option>
						{transactionsCategories.map((item, index) => {
							return <option selected={(transactionTmp.category == (index+1)) ? 'selected' : ''} key={index} value={index+1}>{item}</option>
						})}
					</select>
					</div>
				</div>
				<div className="form__field">
					<h3>Transaction title: </h3>
					<input ref={formFieldTitle} type="text" placeholder="Transaction title" defaultValue={transactionTmp.title} />
				</div>
				<div className="form__field">
					<h3>Description:</h3>
					<input ref={formFieldDesc} type="text" placeholder="Description" defaultValue={transactionTmp.description} />
				</div>
				<button onClick={transactionEdit}></button>
			</div>
		</div>

		setTransactionForm(html)
	}

	const showTransaction = () => {
		const html  = (
			<>
				<Header to="transactions" title={transactionTmp.date} />	
				
				<div className="transaction">
					<div className="transaction__card">
					<div className="transaction__card_promo">
						<h3 className="transaction__card_title">{transactionTmp.card_title}</h3>
						<div className="transaction__date">{transactionTmp.date}</div>
					</div>
						<div className="transaction__cost">{transactionTmp.type == 'in' ? '+' : '-'}$ {transactionTmp.cost}</div>
					</div>
					<div className="transaction__categories">{transactionTmp.category_name}</div>
					<h1 className="transaction__title_active">{transactionTmp.title}</h1>
					<p className="transaction__description">{transactionTmp.description}</p>
					<div className="transaction__btns">
						<button onClick={transactionShowForm} className="transaction__btn_edit"></button>
						<button onClick={transactionRemove} className="transaction__btn_remove"></button>
					</div>
				</div>
			</>
		)

		setTransaction(html)
	}

	useEffect(() => {
		document.title = "Transaction"
	})

	useEffect(() => {
		if (dataCards.length > 0 && dataTransactions.length > 0) showTransaction()
	}, [dataCards, dataTransactions])
	
	return (
	<div className="page transaction">
		<div className="container">
			{transaction}
			{transactionForm}
		</div>
	</div>
	)
}

export default Transaction
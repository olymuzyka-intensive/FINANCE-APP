import { useContext, useEffect, useRef, useState } from "react"

import { AppContext } from "../App"

import Header from "./Header"

function Cards() {
	const {
		dataCards, setDataCards, 
		cardLastId, setCardLastId, 
		dataTransactions, setDataTransactions
	} = useContext(AppContext)

	const [cardsForm, setCardsForm] = useState(null)

	const formFieldTitle = useRef()
	const formFieldNumber = useRef()

	const removeTransactionsByCard = (card_id) => {
		if (dataTransactions.length == 0) return

		const dataTransactionsTmp = dataTransactions.filter((item) => +item.card_id != +card_id);

		setDataTransactions([...dataTransactionsTmp])
	}

	const cardsAdd = () => {
		const title = formFieldTitle.current.value
		const number = formFieldNumber.current.value

		const numberPattern = /^\d+$/;

		let newId = cardLastId
		newId++

		const card = {
			id: newId,
			title: title,
			number: number,
			balance: 0
		}

		if (!card.title || card.title.length == 0 || !card.number || !card.number.match(numberPattern)) {
			return
		}

		const dataCardsTmp = dataCards
		dataCardsTmp.push(card)

		setCardLastId(newId)
		setDataCards([...dataCardsTmp])
		setCardsForm(null)
	}

	const cardRemove = (id) => {
		const dataCardsTmp = dataCards.filter((item) => +item.id != +id);

		setDataCards([...dataCardsTmp])
		removeTransactionsByCard(id)
	}

	const cardsShowForm = () => {
		const html = <div className="cards__add_form">
			<h3>Add new card</h3>
			<div className="form">
				<div className="form__field">
					<h3>Card title: </h3>
					<input ref={formFieldTitle} type="text" placeholder="Card title" />
				</div>
				<div className="form__field">
					<h3>Card number: </h3>
					<input ref={formFieldNumber} type="text" placeholder="Card number" />
				</div>
				<button className="cards__btn_send" onClick={cardsAdd}></button>
			</div>
		</div>;

		setCardsForm(html)
	}

	useEffect(() => {
		document.title = "My cards"
	})

	return (
	<div className="page cards">
		<div className="container">
		
			<Header title="My cards" />
			
			<ul className="cards__list">
			{dataCards.map((item, index) => {
				return <li key={index} className="cards__item card">
					<div className="card__promo">
						<h3 className="card__title">{item.title}</h3>
						<div className="card__number">{item.number}</div>
						<div className="card__balance">
							<h4 className="card__balance_title">Balance</h4>
							<div className="card__balance_number">
								$ {item.balance.toFixed(2)}
							</div>
						</div>
					</div>
						<button onClick={() => { cardRemove(item.id) }} className="card__btn_remove"></button>
					
				</li>
			})}
			</ul>

			<div className="cards__add">
				{cardsForm}
				<button onClick={cardsShowForm} className="cards__btn_add"></button>
			</div>

		</div>
	</div>
	)
}

export default Cards
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KcqoWJoQcapggoAHWfJs23e0bQJXyu3rMs5OuwGqOg9e7keJgvuFLqH5EOztTS7P2FcuXCz8eBCLLuN38ZRuzY600J5tq8hep"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({x,y}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm price={x} id1={y}/>
		</Elements>
	)
}
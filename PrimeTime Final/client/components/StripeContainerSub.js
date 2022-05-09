import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentFormSub from "./PaymentFormSub"

const PUBLIC_KEY = "pk_test_51KcqoWJoQcapggoAHWfJs23e0bQJXyu3rMs5OuwGqOg9e7keJgvuFLqH5EOztTS7P2FcuXCz8eBCLLuN38ZRuzY600J5tq8hep"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainerSub({}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentFormSub price={50} idclient={JSON.parse(localStorage.getItem("user"))._id}/>
		</Elements>
	)
}
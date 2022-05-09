import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentFormCourses from "./PaymentFormCourses"

const PUBLIC_KEY = "pk_test_51KcqoWJoQcapggoAHWfJs23e0bQJXyu3rMs5OuwGqOg9e7keJgvuFLqH5EOztTS7P2FcuXCz8eBCLLuN38ZRuzY600J5tq8hep"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainerCourses({x,idcourse,idstudent}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentFormCourses price={x} idstudent={idcourse} idcourse={idstudent}/>
		</Elements>
	)
}
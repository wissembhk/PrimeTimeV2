import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Axios from "axios"
import React, { useState } from 'react'
import { BASE_URL } from "../constant/constants"


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm({price,idclient}) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            console.log(id);
            const response = await Axios.post(BASE_URL+"courses/paymentCourse", {
                amount: price*100,
                id
            })

           


            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

             
            

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button class="btn btn-success" >Pay</button>
        </form>
        :
       <div>
           <h4>Congrats you have Subscribed !</h4>
       </div> 
        }
            
        </>
    )
}
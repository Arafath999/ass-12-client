import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure'
import UseOffer from "../../../Components/Hooks/UseOffer";
import useAuth from "../../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [offer,refetch] = UseOffer()
    const navigate = useNavigate();
    // const totalPrice = offer.reduce( (total, item) => total + parseInt(item.offeredAmount) ,0)
    const agentEmailString = offer.map(item => item.agentEmail).join(', ');
    const propertyTitleString = offer.map(item => item.propertyTitle).join(', ');
    const propertyLocationString = offer.map(item => item.propertyLocation).join(', ');
    const totalPrice = offer.reduce((total, item) => total + parseInt(item.offeredAmount.replace(/\D/g, ''), 10), 0);

    useEffect(() => {
      const totalPriceNumeric = parseInt(totalPrice);
      if (!isNaN(totalPriceNumeric) && totalPriceNumeric >= 1) {
          axiosSecure.post('/create-payment-intent', { offeredAmount: totalPriceNumeric })
              .then(res => {
                  console.log(res.data.clientSecret)
                  setClientSecret(res.data.clientSecret)
              })
      }
  }, [axiosSecure, totalPrice]);
  
    

    

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }

        const { error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error) {
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment 
        const { paymentIntent , error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user.email || 'anonymous',
              name: user?.displayName || 'anonymous'

            }
          }
        })

        if(confirmError) {
          console.log('confirm error')
        }
        else{
          console.log('payment intent', paymentIntent)
          if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id)
            setTransactionId(paymentIntent.id)

            // now save the payment in the database
             const payment = {
              email: user.email,
              agentEmail: agentEmailString,
              propertyTitle: propertyTitleString,
              propertyLocation: propertyLocationString,
              offeredAmount: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date(),
              offerId: offer.map(item => item._id),
              offerItemId: offer.map(item => item.propertyId),
              verificationStatus: 'accepted'
            }

            const res = await axiosSecure.post('/payments', payment)
            console.log('payment saved', res.data)
            refetch()
            if(res.data?.paymentResult?.insertedId)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/paymentHistory')
          }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-secondary mt-4 ml-4" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600">Your transaction id: {transactionId} {error}</p> }
            
        </form>
    );
};

export default CheckoutForm;
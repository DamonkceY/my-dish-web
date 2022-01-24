import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { checkIntent } from '../../app/store/storeModules/cart/cartService'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { selectOrderConfirmationDetails } from '../../app/store/storeModules/cart/cartSlice'
import { setRootLoading } from '../../app/store/storeModules/root/root'


const CheckoutForm = () => {
  const orderConfirmationDetails = useAppSelector(selectOrderConfirmationDetails)
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch()
  const handleSubmit = async (event: any) => {
    dispatch(setRootLoading(true))
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    })
    dispatch(setRootLoading(false))

    // if (result.error) {
    //   // Show error to your customer (for example, payment details incomplete)
    //   console.log(result.error.message);
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}>Valider</button>
      </form>
    </div>
  )
}

export default CheckoutForm

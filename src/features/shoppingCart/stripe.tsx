import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useAppSelector } from '../../app/store/hooks'
import { selectOrderConfirmationDetails } from '../../app/store/storeModules/cart/cartSlice'
import CheckoutForm from './checkoutForm'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(
  'pk_test_51KAie9H4dm7y0pXAM0SLJ47CM0ylxBVSRdsxuKXF9K9HKpgXP8YHVTQiyoRdqF71OyDjA6VrXzUKqfC51KvSPUsA00ZaOCNjFg'
)

const Stripe = () => {

  const orderConfirmationDetails = useAppSelector(selectOrderConfirmationDetails)
  const options = {
    // passing the client secret obtained from the server
    clientSecret: orderConfirmationDetails?.paymentIntent?.publishableKey,
  }



  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

export default Stripe

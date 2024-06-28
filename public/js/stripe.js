/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    const stripe = await loadStripe(
      'pk_test_51PVr5m08m9FTYl5hRQDpgS4X2cShnohWJ3Fmr87tBPTDAGOAlEa7GkW3guZhtz76SEyjLmWiQzJiq4TIyT89Ri8C00bxKXxZzO',
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

import express, { Application, Request, Response,  } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandlers from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import admin, { ServiceAccount } from 'firebase-admin';

import config from './app/config';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// Initialize Firebase Admin with credentials
admin.initializeApp({
  credential: admin.credential.cert(config.google_application_credentials as ServiceAccount),
});

// Create Express app
const app: Application = express();

// Middleware for JSON parsing and CORS
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: false, // Set this to false if you don't need to send cookies or authentication info
    })
  );

// Application routes
app.use('/api', router);

// Test endpoint (example)
app.get('/', async (req: Request, res: Response) => {
  try {
    const a = 555;
    res.json({ value: a });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/create-payment-intent', async (req: Request, res: Response) => {
    const { price } = req.body;
  
    // Ensure price is a number and handle parsing correctly
    const amount = Math.round(parseFloat(price) * 100); // Round and convert price to cents
  console.log(amount)
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        // Specify the payment method types if required, e.g., ['card']
        payment_method_types: ['card'], // Add 'card' or other methods as needed
      });
  
      // Send the client secret back to the client
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      // Respond with a user-friendly error message
      res.status(500).json({ error: 'An error occurred while creating the payment intent.' });
    }
  });
// Global error handler
app.use(globalErrorHandlers);

// Not found route handler
app.use(notFound);

export default app;

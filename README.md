# Eclectic Shop
Welcome to the Eclectic Shop, a hypothetical SPA fullstack shop project.
The Eclectic Shop has a frontend built on Next.js and Material-UI. MongoDB and Hygraph handles the main and blog database side of things, while Tanstack Query and Axios are used to communicate with them. Stripe handles payments. Nodemailer handles things like emailing customers. Last but not least Auth0 is used for authentication.

[Online deployed link](https://ch15-fs-shop.vercel.app/)

## Test Card Payments
If you would like to test the payment system, please use the following card details as per the [Stripe Documentation](https://docs.stripe.com/testing#use-test-cards):

Card Number: `4242 4242 4242 4242`

Expiration Date: Any valid future date, such as `12/34`

Card Verification Code: Any three-digit CVC (four digits for American Express cards) like `123` or `1234`

Other form fields like Name can be any value.

## Manual Deployment
Note that for manual deployment, the .env.example file will need to be renamed to .env.local, and your values filled in to connect to Auth0, Hygraph and Stripe.

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Favicon/Logo courtesy of Stockio.com
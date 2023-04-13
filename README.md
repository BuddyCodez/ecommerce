# ShopWave eCommerce Website

ShopWave is an eCommerce website developed by Udit Vegad (aka BuddyCodeZ) using Next.js and MongoDB. This website allows users to browse and purchase products online, as well as manage their shopping cart and view order history.

## Features

- User Registration and Authentication: Users can register for an account on the website and log in to access their account information, view order history, and manage their shopping cart.
- Product Catalog: Users can browse and search for products in the website's product catalog, view product details, and add products to their shopping cart.
- Shopping Cart: Users can add products to their shopping cart, view the contents of their shopping cart, update the quantity of products, and remove products from their cart.
- Checkout: Users can proceed to the checkout page to review their order details, enter shipping and payment information, and place an order.
- Order History: Registered users can view their order history, including order status and tracking information.
- Admin Panel: Administrators can log in to the website's admin panel to manage products, orders, and users. Admins can add, edit, and delete products, view order details, and manage user accounts.

## Technologies Used

- Next.js: A popular React framework for building server-rendered React applications.
- MongoDB: A NoSQL database used for storing product, order, and user data.
- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing application state.
- Express: A minimal web application framework for Node.js used for building the backend API.
- Stripe: A popular payment gateway used for processing online payments.
- Ant Design: A popular UI component library for React used for building the website's user interface.
- Passport: A popular authentication middleware for Node.js used for implementing user authentication and authorization.
- Bcrypt: A popular library for hashing passwords used for securing user accounts.
- NextAuth: A popular authentication library for Next.js used for handling user authentication and authorization.

## Getting Started

1. Clone the repository: `git clone https://github.com/buddycodez/shopwave.git`
2. Change to the project directory: `cd shopwave`
3. Install dependencies: `npm install`
4. Create a `.env` file in the project root directory and add the following environment variables:

MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
NEXTAUTH_URL=<your_nextauth_url>

5. Start the development server: `npm run dev`
6. Open a web browser and go to `http://localhost:3000` to access the website.

## Deployment

The website can be deployed to a production environment using a platform like Vercel, Heroku, or AWS. Follow the documentation of your chosen hosting platform to deploy the website.

## Contributing

If you would like to contribute to the development of the ShopWave eCommerce website, please fork the repository, create a new branch for your changes, and submit a pull request. Contributions are welcome and greatly appreciated.

## License

The ShopWave eCommerce website is open source software under the [MIT License](LICENSE).

## Contact Information

For any inquiries or questions, please contact Udit Vegad (aka BuddyCodeZ) at [insanebuddy888@gmail.com] or visit [https://uditvegad.vercel.app].
Note: Please replace the placeholder <your_mongodb_uri>, <your_jwt_secret>, <your_stripe_secret_key>, and <your_nextauth_url> with the actual values

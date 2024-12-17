# Bazaaro - Frontend

The **Bazaaro Application** frontend provides an intuitive, responsive, and user-friendly interface for customers, vendors, and administrators. Built with modern web technologies, it seamlessly integrates with the backend API to offer a smooth online shopping experience. The project leverages **React.js** (or **Next.js**) for its component-based architecture, ensuring scalability, performance, and maintainability.

## Live Deployment

- **Frontend URL**: https://bazaaro-three.vercel.app/
- **Backend API URL**: https://bazaro-backend.vercel.app/

## Technology Stack

- **Framework**: React.js
- **State Management**: Redux
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Type Checking**: Typescript
- **API Integration**: Redux toolkit query
- **Form Handling**: React Hook Form
- **Payment Gateway**: Integration with Stripe
- **Build Tool**: Vite

## Features and Functionalities

### 1. **Home Page**

- Banner
- Highlight flash sale products with quick redirection
- Category selection to auto-filter products on a new page
- Featured products
- Featured Vendors

### 2. **Product Details Page**

- Display product information: name, price, images, description
- Show related products from the same category
- Reviews and ratings for purchased products
- Quick access to vendor shop details

### 3. **Shop Page**

- Vendor’s shop information with product listings
- Follow/unfollow shop functionality
- Option to add products directly to the cart

### 4. **Cart Functionality**

- Single-vendor cart restriction:
  - Add products only from one vendor at a time
  - Options to **replace** the cart or **cancel** the addition
- Dynamic price calculation for all items in the cart

### 5. **Checkout**

- Apply coupon codes for discounts
- Payment integration with **Stripe**

### 6. **Authentication**

- **Signup**: Register as a user or vendor
- **Login**: Secure login with JWT authentication
- Password management: Reset and change password via email

### 7. **Vendor Dashboard**

- Manage shop details (name, logo, description)
- Add, edit, duplicate, and delete products
- View customer reviews and order history (paginated)

### 8. **Recent Products Page**

- Displays the **last 10 products** viewed by the user

### 9. **Product Comparison**

- Compare up to **3 products** from the same category
- Comparison based on attributes like price, ratings, and descriptions

## Getting Started

Follow these steps to set up the frontend locally:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.x or higher) & npm (v6.x or higher)
- **Yarn** (optional, if preferred over npm)
- A running **backend server** (refer to the backend repository)

## Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/omarfaruktaj/bazaaro-frontend
   cd bazaaro-frontend
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```plaintext
   VITE_CLOUDINARY_CLOUD_NAME= your cloud name
   VITE_CLOUDINARY_UPLOAD_PRESET= your upload preset
   BASE_API = "http://localhost:5000/api"
   VITE_STRIPE_PUBLIC_KEY= stripe public key

   ```

4. **Start the development server:**

   ```bash
   yarn run dev
   ```

   The application should now be running at `http://localhost:3000`.

## Key Features

1. Clean UI: Designed with Tailwind CSS and responsive best practices
2. State Management: Optimized with Redux for efficient global state handling
3. Fast Rendering: Leveraging React's virtual DOM for enhanced performance
4. Scalability: Modular components and paginated API integration for large datasets

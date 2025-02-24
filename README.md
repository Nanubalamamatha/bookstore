Online Bookstore App
====================

A simple, minimal online bookstore application built with **Next.js** and **Supabase**. This project features user authentication, CRUD operations for books, a shopping cart, and a checkout simulation.

Features
--------

*   **User Authentication:** Secure sign-in/sign-up functionality powered by Supabase.

*   **Book Management:** Browse, add, update, and delete books.

*   **Shopping Cart:** Add books to your cart with proper handling of duplicate entries.

*   **Checkout Simulation:** Review your order summary and complete the purchase process.

*   **Database Schema:** Tables for books, cart items, orders, and order items are designed to support the application's operations.


# Online Bookstore App

A simple, minimal online bookstore application built with **Next.js** and **Supabase**. This app features user authentication, CRUD operations for books, a shopping cart, and a checkout simulation.

## Features

- **User Authentication:** Sign in and sign up using Supabase.
- **Book Management:** Browse, add, update, and delete books.
- **Shopping Cart:** Add books to your cart with logic to update quantities for duplicate entries.
- **Checkout Simulation:** Review your order summary and complete the purchase process.

## Database Schema

Below is the SQL schema used for the project:

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Unique constraint to ensure each user can only have one entry per book in their cart
ALTER TABLE cart_items ADD CONSTRAINT unique_user_book UNIQUE (user_id, book_id);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

Setup and Installation
----------------------

### Prerequisites

*   **Node.js** (version 12.x or higher)

*   **npm** (or yarn)

*   A Supabase account with a project set up for authentication and database management

### Installation Steps

1.  git clone https://github.com/yourusername/online-bookstore-app.gitcd online-bookstore-app

2.  npm install

3.  next dev


Project Structure
-----------------

*   **Layout:** Contains the header with navigation and authentication status.

*   **Pages:**

    *   **Home:** Displays a welcome message and a link to browse books.

    *   **Books:** Lists all available books and includes an option to add them to the cart.

    *   **Cart:** Shows the items in the user's cart, with options to remove items or proceed to checkout.

    *   **Checkout:** Displays an order summary along with a form to complete the purchase.

    *   **Authentication:** Dedicated page for user sign-in and sign-up.
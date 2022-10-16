# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `'products/showproducts' [GET]`
- Show `'products/showproduct/:id' [GET]`
- Create [token required] `'products/create' [POST] [token]`
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] `'users/showusers' [GET] [token]`
- Show [token required]  `'users/show/:id' [GET] [token]`
- Create N[token required] `'users/create' [POST] [no token]`

#### Orders
- Current Order by user (args: user id)[token required] `'orders/current' [GET] [token]`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `'orders/complete' [GET] [token]`
- create orders `'orders/create' [POST] [token]`
- add products to order `'orders/:id/products' [POST] [token]`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- order_id
- user_id
- status of order (active or complete)

#### 0rders_products
- id
- quantity
- order_id
- product_id

#### Database Schema
- Users Table:
users (id: integer SERIAL PRIMARY KEY , firstName: VARCHAR , lastName: VARCHAR, password VARCHAR)
- Products Table:
products (id: integer SERIAL PRIMARY KEY, product_name: VARCHAR, price: integer)
- Orders Table:
orders (order_id: integer SERIAL PRIMARY KEY, user_id: integer foreign key references users(id), status: enum status)
TYPE status AS ENUM('active','complete')
- Order_Products Table:
order_products (id: integer SERIAL PRIMARY KEY , quantity: integer , order_id: integer foreign key references orders(order_id) , product_id: integer foreign key references products(id));

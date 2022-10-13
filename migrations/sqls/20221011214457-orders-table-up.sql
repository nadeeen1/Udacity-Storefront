CREATE TYPE status AS ENUM('active','complete');
CREATE TABLE orders (order_id SERIAL PRIMARY KEY, user_id INT , status status , FOREIGN KEY(user_id) REFERENCES users(id));
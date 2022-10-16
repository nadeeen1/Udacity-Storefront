# StoreFront Backend Project #2 for Udacity
In this repo lies a fully functioning API which acts as the backend of an online store site. All of the necessary endpoints have been implemented to further facilitate the frontend development process.
All database related details can be found in the REQUIREMENTS.md file located below this file.

### Database set up instruction
The steps for database initialization are as follows:
- connect to psql default database named 'postgres'
- create two new database named db and db_test, where db_test will be used during the testing phase.
    - the following sql commands can be used:
    - CREATE DATABASE db;
    - CREATE DATABASE db_test;
    - p.s: don't forget the semi colon at the end of each query!
- To connect to a specific database run the following query:
    - \c database_name
- All sql table create queries are located in the 'sql' folder located under the 'migrations' folder

### Database migrations
- To migrate your sql queries onto the database run:
    - npm run up to migrate the db database
    - npm run testup to migrate the testing database namely db_test

### .env file
- The following environmental variables were used during the development phase. These need to be placed in a .env file (replace hashed values with your own)
    - POSTGRES_HOST = 127.0.0.1
    - POSTGRES_DB = db
    - POSTGRES_TEST_DB = db_test
    - POSTGRES_USER = ####
    - POSTGRES_PASS = ####
    - POSTGRES_PORT = 5432
    - ENV = dev
    - BCRYPT_PASSWORD = #####
    - SALT_ROUNDS = 10
    - TOKEN_SECRET = ####

### Run server
- To run the app and start the server run the following command:
    - npm run start
    - server should start on port 3000

### Testing phase
- To run the jasmine unit tests implemented, run the following command in terminal :
    - npm run testing

### scripts
- npm run build will compile typescript down to javascript in a folder named 'build'
- npm run reset will run all down migrations on the db database
- npm run testdown will run all down migrations on the testing database db_test
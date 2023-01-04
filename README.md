# Coffee Shop Backend

Codebase containing CRUD and auth to provide client side for our [project](##Related)

[![dotenv](https://img.shields.io/badge/dotenv-16.0.3-blue)](https://www.npmjs.com/package/dotenv)
[![express](https://img.shields.io/badge/express-4.18.1-blue)](https://www.npmjs.com/package/express)
[![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-blue)](https://www.npmjs.com/package/bcrypt)
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-blue)](https://www.npmjs.com/package/jsonwebtoken)
[![multer](https://img.shields.io/badge/multer-1.4.4-blue)](https://www.npmjs.com/package/multer)
[![morgan](https://img.shields.io/badge/morgan-1.10.0-blue)](https://www.npmjs.com/package/morganr)
[![postgreSQL](https://img.shields.io/badge/pg-8.8.0-blue)](https://www.npmjs.com/package/morganr)

# Installation

## 1. Clone this repository

Clone this repository by run the following code:

```
git clone https://github.com/rsad100/Intermediete_Backend.git
```

## 2. Go to directory

```
cd coffee_shop_backend
```

## 3. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
npm install / npm i
```

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to posgreSQL
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our sql models.
- `handler/` - This folder contains the schema definitions for unctions that separate out the code to route requests from the code that actually processes requests.
- `middleware/` - This folder contains the schema definitions for middleware.
- `helper/` - This folder contains helper functions to make our code much easier to read
- `public/` - This folder contains uploaded data to our API

## Documentation

[Documentation](https://github.com/rsad100/Intermediete_Backend.git)

## Features

- Auth
  - login
  - logout
- Product
  - Get Product
  - Post Product
  - Patch Product
  - Delete Product
- Users
  - Get User
  - Post user
  - Patch User
  - Delete User
  - Post Register User
  - Patch Change Password
  
- Transactions
  - Get Transactions by id
  - Get All Transactions
  - Get Subtransactions
  - Get Latest Transaction
  - Post New Transaction
  - Post New Subtransaction
  - Patch Transaction as Done
  - Delete Transaction
  
- Promos
  - Get Promos
  - Post Promos
  - Patch Promos
  - Delete Promos

## API Reference Example

```http
  GET, POST /products
```

```http
  GET, POST, PATCH, DELETE /products/${id}
```

```http
  GET, POST, UPDATE /transactionnew
```

```http
  DELETE /transasctionnew/${id}
```

## Authors

- [@rsad100](https://github.com/rsad100/)

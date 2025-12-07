# CS648 - Assignment 13 (Full Stack Inventory App)

This project implements the required full-stack inventory / product management system
using React on the front-end and Node, Express, and MongoDB on the back-end.

## Structure

- `server/` - Node + Express + MongoDB API
- `client/` - React front-end (Create React App)

## MongoDB Document Shape

Each document in the `products` collection follows the instructor's required shape:

```json
{
  "id": 0,
  "product": {
    "productid": 0,
    "category": "",
    "price": 0,
    "name": "",
    "instock": true
  }
}
```

## How to Run

1. Start MongoDB locally or provide a connection string in `server/.env`:

   ```env
   MONGO_URI=mongodb://localhost:27017/assignment13
   PORT=5000
   ```

2. Install and run the server:

   ```bash
   cd server
   npm install
   npm run dev   # or: npm start
   ```

3. Install and run the client (React app):

   ```bash
   cd ../client
   npm install
   npm start
   ```

The React app runs on `http://localhost:3000` and talks to the API at
`http://localhost:5000` via the CRA proxy.

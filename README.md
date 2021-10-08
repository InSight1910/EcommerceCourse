# An API for an eccommerce with NodeJS and MongoDB
This is an API that is built with NodeJS for the server, MongoDB for the database, and Molter for managing image uploads.
You can add a product or an order, or if you are an administrator, you can access the information of a user or you can obtain all the users who are registered in your store (Information that is relevant to contact him, such as email, telephone, name , etc.).

You can also sign up or login with JsonWebToken (JWT) authentication, so you have all routes protected with authentication. Also, the project has custom bugs to handle some of the issues you will encounter in the app.

# Routes
### Product

```
GET         /api/v1/products
GET         /api/v1/products/:id
POST        /api/v1/products
PUT         /api/v1/products/:id
DELETE      /api/v1/products/:id
PUT upload gallery images:      /api/v1/products/:id
GET featured:       /api/v1/products/get/featured
GET count product:       /api/v1/products/get/count
```

### Order

```
GET         /api/v1/orders
GET         /api/v1/orders/:id
POST        /api/v1/orders/
PUT         /api/v1/orders/:id
DELETE      /api/v1/orders/:id
GET order count  /api/v1/orders/get/count
```

### User

```
GET             /api/v1/users
GET             /api/v1/users/:id
GET user count: /api/v1/users/get/count
```

### Auth

```
POST            /api/v1/auth/signup
POST            /api/v1/auth/login
```

## Model of Response

### Product

``` json
{
    "name": "string",
    "description": "string",
    "richDescription": "string",
    "image": "string",
    "images": ["string",],
    "brand": "string",
    "category": "string",
    "countInStock": 250,
    "rating": 5,
    "numReviews": 0,
    "isFeatured": false,
    "dateCreated": 1633585370424
}
```

### Order

``` json
{
    "orderItems": ["string",],
    "shipingAddress": "string",
    "city": "string",
    "zip": "string",
    "country": "string",
    "status": "string",
    "totalPrice": 0,
    "user": "string",
    "dateOrdered": 1633585370424
}
```

### User

``` json
{
    
}
```
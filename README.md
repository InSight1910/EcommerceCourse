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

### Category
``` json
{
    "name": "string",
    "icon": "string",
    "color": "string"
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
    "name": "string",
    "email": "string",
    "phone": "string",
    "isAdmin": false,
    "street": "string",
    "apartment": "string",
    "zip": "string",
    "city": "string",
    "country": "string"
}
```

### Auth login

``` json
{
        "email": "string",
        "token": "string"
}
```
### Auth signup

``` json
{
    "name": "string",
    "email": "string",
    "phone": "string",
    "isAdmin": false,
    "street": "string",
    "apartment": "string",
    "zip": "string",
    "city": "string",
    "country": "string"
}
```

## Model of POST

### Product

``` json
{
    "name": "string",
    "description": "string",
    "richDescription": "string",
    "image": "file",
    "brand": "string",
    "category": "string",
    "countInStock": 250,
    "rating": 5,
    "numReviews": 0,
    "isFeatured": false
}
```
### Category

``` json
{
    "name": "string",
    "icon": "string",
    "color": "string"
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
    "user": "string"
}
```

### User

``` json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "isAdmin": false,
    "street": "string",
    "apartment": "string",
    "zip": "string",
    "city": "string",
    "country": "string"
}
```

### Auth login
``` json
{
    "email": "string",
    "password": "string"
}
```

## Examples of POST

### Product

``` json
{
    "name": "Laptop gaming",
    "description": "A laptop",
    "richDescription": "A laptop with a screen",
    "image": "image.png",
    "images": ["image.png", "image1.jpg", "image2.jpeg"],
    "brand": "A random brand",
    "category": "6152ab15669e8d792b9ac83b (ID of a category)",
    "countInStock": 250,
    "rating": 4.5,
    "numReviews": 20,
    "isFeatured": true,
}
```
### Category

``` json
{
    "name": "laptop",
    "icon": "icon-laptop",
    "color": "#000000"
}

```
### Order

``` json
{
    "orderItems": [{"product": "6152ab15669e8d792b9ac83b (product ID)", "quantity": 2}],
    "shipingAddress": "15 Main Street",
    "city": "New York",
    "zip": "10080",
    "country": "USA",
    "user": "6152ab15669e8d792b9ac83b (ID user)"
}
```

### User

``` json
{
    "name": "Vicente",
    "email": "example@gmail.com",
    "password": "TheBestPasswordOfTheWorld",
    "phone": "+53485983590",
    "isAdmin": true,
    "street": "15 Main Street",
    "apartment": "345",
    "zip": "10080",
    "city": "New York",
    "country": "USA"
}
```

### Auth login
``` json
{
    "email": "example@gmail.com",
    "password": "TheBestPasswordOfTheWorld" // Dont worry your password is encrypted in our database
}
```
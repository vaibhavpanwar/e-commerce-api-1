# e-commerce-api-1
E commerce Webiste Backend Api using Nodejs

This is a backend api created using nodejs for the Ecommerce -website

Routes (u can check the routes on Postman or on any other application)

User Routes
//to create a user -> (Post) /api/users 
//to Authenticate a user -> (Get) /api/auth 
// To Login a user -> (POST) /api/auth

Products and Category Roues 
//to view all categories =>(Get) /api/categories 
//to view all products ->(Get) /api/categories/products 
// browse products by category => (GET) /api/categories/products/:category_id

Cart Routes 
//add to cart => (get) /api/user/cart/:product_id 
//list cart items -> (get) /api/user/cart

Admin Routes 
//register admin => same as register user then change the isAdmin property to true from database 
//login admin => same as user login but u will get different token too access admin routes 
Admin Products And Categpries Routes 
//to add a category => (post) /api/categories 
//to delete a category =>(delete) /api/categories.:category:id 
//add product to categ =>(post) /api/categories/:category:id 
//delete product =>(delete) /api/categories/:product:id 
//update product =>(put) /api/categories/:category_id/:product_id

DB ~ Mongo Db

Npm Packages Used ~ Expressjs ~ to create end points 
Mongoose ~to implement MongoDb in my app 
Express-validator ~ to validate the json body data on server side 
Bcrypt ~ for password encryption 
JsonWebtoken ~ for authentication 
Config ~ configuration of keys

MODELS : - 
User
Cart 
Category 
Product

Authentication : JsonWebToken (change the expiry time accordingly in /middleware/auth file)

****u can use this api with any of the front end framework easily ****
***install the dependencies using npm installer and then run 'node server' in the root directory******

next task ~ I will Implement this Api with React to make a full functioning web app

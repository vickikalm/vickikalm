*Home-assignment*
###This project is a review system web app,  where you can post, search and view all reviews.

### `Prerequisites`

npm

react

Node

Express

mongoDB

### `How to Run`
Server: from /home-assignment run – node server.js

Client: from /home-assignment/client run – npm start

Run mongoDB with db name ‘reviewsdb’


### `REST api`
*Get*

Fetches the 1000 (or how many is defined in config file) newest reviews from db.

Path: /reviews

Response: array of reviews in form of { id : objected, email : string, message : string }


*Post*

Submits the review from form and inserts to db.

Path: /submit-review

Body: { email : string, message : string }

Response: success or error

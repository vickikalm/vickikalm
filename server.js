const express = require('express');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const config = require("./config/config.json");

const app = express();
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.mongodbUrl, { promiseLibrary: Promise })
    .catch(err => console.error(err.stack))
    .then(db => {
        app.locals.db = db;
    });

app.listen(config.port, () => {
    console.log(`Node.js app is listening`);
});

app.post('/submit-review', [check('email').isEmail(), check('message').isLength({min:1})],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        const review = {
            email: req.body.email,
            message: req.body.message
        };

        var dbo = app.locals.db.db(config.db);
        dbo.collection(config.db).insertOne(review, (error, data) => {
            if (error)
                console.log("error")
        })

        res.json("Success")
    });

app.get('/reviews', (req, res) => {
    var dbo = app.locals.db.db(config.db);
    dbo.collection(config.db).find({}).sort({_id : -1}).limit(config.rowLimit).toArray(function(error, result) {
        if (error) throw error;
            console.log("error");
        //db.close();
        res.json(result);
        //res.render('review', {reviews: result})
    });
});

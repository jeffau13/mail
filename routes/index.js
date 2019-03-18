const https = require('https');
var express = require('express');
const validator = require('validator');
var router = express.Router();
const request = require('request');
const config = require('../config');
const NodeGeocoder = require('node-geocoder');


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const validate = (errors, req) => {
    if (!validator.isEmail(req.body.email)) {
        errors["message"] = "Please use a valid email.";
    }
    if (!validator.isLength(req.body.lastName, { min: 2, max: 30 })) {
        errors["message"] = "Please ensure that your entry has between a minimum of 2 or max 30 characters";
    }
}

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req,res,next)=>{
    res.redirect('/');
})

router.post('/signup', (req, res, next) => {
    let errors = {};
    const { firstName, lastName, email, phone, zipCode, cityName } = req.body;
    validate(errors, req);
    if (!isEmpty(errors)) {
        // render_error(errors,req,res,next);
        return res.render('failed', { errors });
    }
    

    const geoOptions = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: config.geoapi
    };
    const geocoder = NodeGeocoder(geoOptions);
    
    let zipCity = '';
    let state = '';
 
    geocoder.geocode(zipCode, function(err, res) {
        console.log(res);
        zipCity = res[0].city;
        state = res[0].administrativeLevels.level1short;
        console.log(`ZipCity: ${zipCity}`);
        sendData();
    });
    
    
 
 
    
    function sendData(){
    
    
    
        const data = {
            members: [
                {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName,
                        PHONE: phone,
                        CITY: cityName,
                        ZIP: zipCode,
                        STATE: state,
                        ZIPCITY: zipCity

                    }
                }
            ]
        }
        const postData = JSON.stringify(data);
        //temp info
        let dc = config.dc;
        let listId = config.listId;
        let key = config.key;

        const options = {
            url: `https://${dc}.api.mailchimp.com/3.0/lists/${listId}`,
            method: 'POST',
            headers: {
                Authorization: `auth ${key}`
            },
            body: postData

        };

        request(options, (err, response, body) => {
            if (err) {
                return res.render('failed', { error })
            } else {
                if (response.statusCode === 200) {
                    res.render('success');
                } else {
                    res.render('failed');
                }
            };


        });

    }
});



    module.exports = router;
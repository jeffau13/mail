var express = require('express');
const validator = require('validator');
var router = express.Router();

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const validate = (errors,req) =>{
    if (!validator.isEmail(req.body.email)) {
		errors["message"] = "Please use a valid email.";
    }
    if (!validator.isLength(req.body.lastName, {min: 2, max: 30})) {
		errors["message"] = "Please ensure that your entry has between a minimum of 2 or max 30 characters";
	}
}

router.get('/', (req,res,next)=>{
    res.render('index');
});

router.post('/signup', (req,res,next)=>{
    let errors = {};
    const { firstName, lastName, email} = req.body;
    validate(errors,req);
        if (!isEmpty(errors)){
            // render_error(errors,req,res,next);
          return  res.render('failed', {errors});
        }else{
           return res.render('success');
        }
    })
  





module.exports = router;
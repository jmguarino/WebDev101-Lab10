var express = require('express');
var router = express.Router();
var accountDal = require('../dal/account_dal');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render("userFormCreate", {subtitle: "test2"});
});

router.get('/save', function(req, res, next) {
  console.log("firstname equals: " + req.query.firstname);
  console.log("the lastname submitted was: " + req.query.lastname);

  accountDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully saved the data.");
    }
  });

});

module.exports = router;

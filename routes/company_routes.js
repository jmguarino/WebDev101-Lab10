var express = require('express');
var router = express.Router();
var companyDal = require('../dal/company_dal');
var addressDal = require('../dal/address_dal')

/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var company_id = req.query.company_id;
    console.log("company_id: " + company_id);
    companyDal.GetByID(company_id, function(err, company_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with id " + company_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('company/company_edit', data);
        }
        else {
            addressDal.GetAll(function(err, address_results) {

                console.log(company_results);
                var data = {
                    company: company_results,
                    address: address_results
                };
                res.render('company/company_edit', data);
            })
        }
    });

});


router.get('/update', function(req, res, next) {
    companyDal.Update(req.query, function(err, result){
        var company_id = req.query.company_id;
        console.log("company_id: " + company_id);
        companyDal.GetByID(company_id, function(err, company_results){

            if(err) {
                var alert_class = 'alert-danger';
                var data = {
                    message: "Error retrieving company with id " + company_id + "<p>" + err + "</p>",
                    alert_class: alert_class
                };
                res.render('company/company_edit', data);
            }
            else {
                addressDal.GetAll(function(err, address_results) {

                    var alert_class = 'alert-success';
                    var message = "Successfully Updated!";

                    console.log(company_results);
                    var data = {
                        message: message,
                        alert_class: alert_class,
                        company: company_results,
                        address: address_results
                    };
                    res.render('company/company_edit', data);
                })
            }
        });
    })
});

module.exports = router;


const express = require('express')
const router = express.Router()
const { Paynow } = require("paynow");


router.post("/payment", async function (req, res, next) {

    let paynow = new Paynow("11473", "63578b9b-795b-4ded-a25d-52ca7e87f0d8");

    paynow.resultUrl = "http://example.com/gateways/paynow/update";
    paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";

    makePayment();

    async function makePayment() {
        const ref = new Date().getTime();

        const payment = paynow.createPayment(`Invoice ${ref}`, 'tatendabakozw@gmail.com');

        payment.add("Oranges", 30);
        payment.add("Bread", 15);

        try {
            const response = await paynow.sendMobile(payment, '0771445411', 'ecocash');
            if (response && response.success) {
                res.json(response)
            } else {
                res.json(response);
            }
        } catch (e) {
            next(e)
        }
    }

});

module.exports = router
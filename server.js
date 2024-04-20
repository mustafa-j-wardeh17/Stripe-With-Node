import express from 'express'
import stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const stripe_ = stripe(process.env.SECRET_STRIPE_KEY)

//-----------------------------------------
//------------ Create Customer ------------
//-----------------------------------------
const createCustomer = () => {
    const param = {}
    param.email = 'mostafa.wa0025@gmail.com'
    param.name = "Mustafa"
    param.description = "from node"

    stripe_.customers.create(param, (err, cus) => {
        if (err) {
            console.log("fail: " + err)
        } else if (cus) {
            console.log('success: ' + JSON.stringify(cus, null, 2))
        } else {
            console.log("Something Went Wrong")
        }

    })
}
//createCustomer()

//-----------------------------------------
//----------- Retrieve Customer -----------
//-----------------------------------------
const retrieveCustomer = () => {
    stripe_.customers.retrieve('cus_PxWhPzejZy8fer', (err, cus) => {
        if (err) {
            console.log("err " + err)
        } else if (cus) {
            console.log('success: ' + JSON.stringify(cus, null, 2))
        } else {
            console.log("Something Went Wrong")
        }
    })
}
//retrieveCustomer()

//-----------------------------------------
//---------- Create Card Token ------------
//-----------------------------------------
const createCardToken = () => {
    const param = {}
    param.card = {
        number: '4000056655665556', // Test card number
        exp_month: 5,
        exp_year: 2025,
        cvc: 123 // Test CVC
    }
    stripe_.tokens.create(param, (err, token) => {
        if (err) {
            console.error("Token creation failed:", err);
        } else if (token) {
            console.log("Token created:", token.id);
            // Now you can use the token for making charges or saving it to your database
        } else {
            console.log("Something Went Wrong")
        }
    });
};
//createCardToken()


//-----------------------------------------
//------- Create Bank Account Token -------
//-----------------------------------------
const createBankAccountToken = () => {
    const param = {}
    param.bank_account = {
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
    }

    stripe_.tokens.create(param, (err, token) => {
        if (err) {
            console.error("Token creation failed:", err);
        } else if (token) {
            console.log("Token created:", token.id);
            // Now you can use the token for making charges or saving it to your database
        } else {
            console.log("Something Went Wrong")
        }
    })
}
//createBankAccountToken()


//-----------------------------------------
//--------- Add Card To Customer ----------
//-----------------------------------------
const addCardToCustumer = () => {
    stripe_.customers.createSource('cus_PxWhPzejZy8fer', { source: 'btok_1P7cfsJlEV4xI8fegM0yh5WH' }, (err, card) => {
        if (err) {
            console.log('Failed: ' + err)
        } else if (card) {
            console.log('Success :' + JSON.stringify(card, null, 2))
        } else {
            console.log('SomeThing Went Wrong')
        }
    })
}
//addCardToCustumer()


//-----------------------------------------
//-------- Charge Trough Token Id --------
//-----------------------------------------
const chargeCustomerThroughTokenId = () => {
    const param={
        amount:'2000',
        currency:'usd',
        description:'First Payment Through Node Js',
        source:'btok_1P7cvOJlEV4xI8feaORBo8pJ'
    }

    stripe_.charges.create(param,(err,charge)=>{
        if (err) {
            console.error("Failed:", err);
        } else if (token) {
            console.log("Success:", charge);
            // Now you can use the token for making charges or saving it to your database
        } else {
            console.log("Something Went Wrong")
        }
    })
}
chargeCustomerThroughTokenId()


//-----------------------------------------
//------- Charge Trough Customer Id -------
//-----------------------------------------
const chargeCustomerThroughCustomerID = () => {
    const param={
        amount:'2000',
        currency:'usd',
        description:'First Payment Through Node Js',
        customer:'cus_PxWhPzejZy8fer'
    }

    stripe_.charges.create(param,(err,charge)=>{
        if (err) {
            console.error("Failed:", err);
        } else if (token) {
            console.log("Success:", charge);
            // Now you can use the token for making charges or saving it to your database
        } else {
            console.log("Something Went Wrong")
        }
    })
}
//chargeCustomerThroughCustomerID()




app.listen(3000, () => {
    try {
        console.log('App running successfully on port 3000')
    } catch (error) {
        console.log("Err: " + error)
    }
})
/**
 * Stripe Charge Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#charges
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		
		id: {
			type: 'string',
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"charge"
		},
		created: {
			type: 'datetime' //1425083749
		},
		livemode: {
			type: 'boolean' //false
		},
		paid: {
			type: 'boolean' //true
		},
		status: {
			type: 'string' //false
		},
		amount:{
			type: 'integer' //50
		},
		currency:{
			type: 'string' //usd
		},
		refunded: {
			type: 'boolean' //false
		},
		source: {
			type: 'json' //{}
		},
		captured: {
			type: 'boolean' //true
		},
		balance_transaction: {
			type: 'string' //null
		},
		failure_message: {
			type: 'string' //null
		},
		failure_code: {
			type: 'string' //null
		},
		amount_refunded: {
			type: 'integer' //0
		},
		customer: {
			model: 'Customer' //"cus_5MM1RcCBWYpcy7"
		},
		invoice: {
			model: 'Invoice' //null
		},
		description: {
			type: 'string' //"Charge for funds transfer to customer=%cus_5asUj0MST5mHUt",
		},
		dispute: {
			type: 'string' //null
		},
		metadata: {
			type: 'json' // {"customerFrom": "54a5977904a91e011336bb63","customerTo": "54c800d280fc70e38a7469e1"},
		},
		statement_descriptor: {
			type: 'string' //null
		},
		fraud_details: {
			type: 'json' // {}
		},
		receipt_email: {
			type: 'string' //null
		},
		receipt_number: {
			type: 'string' //null
		},
		shipping: {
			type: 'string' //null
		},
		application_fee: {
			type: 'string' //null
		},
		refunds: {
			type: 'json' //{ object": "list", "total_count": 0, "has_more": false, "url": "/v1/charges/ch_5mXfl1ok3CV6xn/refunds", "data": []}
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	}, 

	beforeValidate: function (values, cb){
		if(values.created){
			values.created = new Date(values.created * 1000);
		}
		cb();
	},

	// Stripe Webhook charge.succeeded
	stripeChargeSucceeded: function (charge, cb) {

		Charge.findOrCreate(charge.id, charge)
	    .exec(function (err, foundCharge){
	      if (err) return cb(err);
	      if (foundCharge.lastStripeEvent >= charge.lastStripeEvent) return cb(null, foundCharge);
	      Charge.update(foundCharge.id, charge)
	      .exec(function(err, updatedCharges){
	      	if (err) return cb(err);
	      	if (!updatedCharges) return cb(null, null);
	      	Charge.afterStripeChargeSucceeded(updatedCharges[0], function(err, charge){
	      		cb(err, charge);
	      	});
	      });
	    });
	},

	afterStripeChargeSucceeded: function(charge, next){
		//Add somethings to do after a charge succeeds
		next(null, charge);
	},

	// Stripe Webhook charge.failed
	stripeChargeFailed: function (charge, cb) {

		Charge.findOrCreate(charge.id, charge)
	    .exec(function (err, foundCharge){
	      if (err) return cb(err);
	      if (foundCharge.lastStripeEvent >= charge.lastStripeEvent) return cb(null, foundCharge);
	      Charge.update(foundCharge.id, charge)
	      .exec(function(err, updatedCharges){
	      	if (err) return cb(err);
	      	if (!updatedCharges) return cb(null, null);
	      	Charge.afterStripeChargeFailed(updatedCharges[0], function(err, charge){
	      		cb(err, charge);
	      	});
	      });
	    });
	},

	afterStripeChargeFailed: function(charge, next){
		//Add somethings to do after a charge succeeds
		next(null, charge);
	},

	// Stripe Webhook charge.captured
	stripeChargeCaptured: function (charge, cb) {

		Charge.findOrCreate(charge.id, charge)
	    .exec(function (err, foundCharge){
	      if (err) return cb(err);
	      if (foundCharge.lastStripeEvent >= charge.lastStripeEvent) return cb(null, foundCharge);
	      Charge.update(foundCharge.id, charge)
	      .exec(function(err, updatedCharges){
	      	if (err) return cb(err);
	      	if (!updatedCharges) return cb(null, null);
	      	Charge.afterStripeChargeCaptured(updatedCharges[0], function(err, charge){
	      		cb(err, charge);
	      	});
	      });
	    });
	},

	afterStripeChargeCaptured: function(charge, next){
		//Add somethings to do after a charge succeeds
		next(null, charge);
	},

	// Stripe Webhook charge.updated
	stripeChargeUpdated: function (charge, cb) {

		Charge.findOrCreate(charge.id, charge)
	    .exec(function (err, foundCharge){
	      if (err) return cb(err);
	      if (foundCharge.lastStripeEvent >= charge.lastStripeEvent) return cb(null, foundCharge);
	      Charge.update(foundCharge.id, charge)
	      .exec(function(err, updatedCharges){
	      	if (err) return cb(err);
	      	if (!updatedCharges) return cb(null, null);
	      	Charge.afterStripeChargeUpdated(updatedCharges[0], function(err, charge){
	      		cb(err, charge);
	      	});
	      });
	    });
	},

	afterStripeChargeUpdated: function(charge, next){
		//Add somethings to do after a charge succeeds
		next(null, charge);
	},

	// Stripe Webhook charge.updated
	stripeChargeRefunded: function (charge, cb) {

		Charge.findOrCreate(charge.id, charge)
	    .exec(function (err, foundCharge){
	      if (err) return cb(err);
	      if (foundCharge.lastStripeEvent >= charge.lastStripeEvent) return cb(null, foundCharge);
	      Charge.update(foundCharge.id, charge)
	      .exec(function(err, updatedCharges){
	      	if (err) return cb(err);
	      	if (!updatedCharges) return cb(null, null);
	      	Charge.afterStripeChargeRefunded(updatedCharges[0], function(err, charge){
	      		cb(err, charge);
	      	});
	      });
	    });
	},

	afterStripeChargeRefunded: function(charge, next){
		//Add somethings to do after a charge succeeds
		next(null, charge);
	}

};

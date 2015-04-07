/**
 * Stripe Applicationfee Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#application_fees
 */

module.exports = {
	
	autoPK: false,

	attributes: {
		id: {
	  		type: 'string', //"fee_5zu43QOh0tbSiC"
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"application_fee"
		},
		created: {
			type: 'datetime' //1428165432
		},
		livemode: {
			type: 'boolean' //false
		},
		amount: {
			type: 'integer' //100
		},
		currency: {
			type: 'string' //"usd"
		},
		refunded: {
			type: 'boolean' //false
		},
		amount_refunded: {
			type: 'integer' //0
		},
		refunds: {
			type: 'json' //{}
		},
		balance_transaction: {
			type: 'string' //"txn_2v2VcOoVgfuxzP"
		},
		account: {
			type: 'string' //"acct_0LK1iaScxogiHw8SRtHg"
		},
		application: {
			type: 'string' //"ca_5zu4wDltE3SnpyqIFnPbp7IRPkv6c76z"
		},
		charge: {
			model: 'Charge' //"ch_5mXfl1ok3CV6xn"
		},
		originating_transaction: {
			type: 'string' //null
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

	// Stripe Webhook application_fee.created
	stripeApplicationFeeCreated: function (fee, cb) {

		Applicationfee.findOrCreate(fee.id, fee)
	    .exec(function (err, foundApplicationfee){
	      if (err) return cb(err);
	      if (foundApplicationfee.lastStripeEvent >= fee.lastStripeEvent) return cb(null, foundApplicationfee);
	      Applicationfee.update(foundApplicationfee.id, fee)
	      .exec(function(err, updatedApplicationfees){
	      	if (err) return cb(err);
	      	cb(null, updatedApplicationfees[0]);
	      });
	    });
	},

	// Stripe Webhook application_fee.refunded
	stripeApplicationFeeRefunded: function (fee, cb) {

		Applicationfee.findOrCreate(fee.id, fee)
	    .exec(function (err, foundApplicationfee){
	      if (err) return cb(err);
	      if (foundApplicationfee.lastStripeEvent >= fee.lastStripeEvent) return cb(null, foundApplicationfee);
	      Applicationfee.update(foundApplicationfee.id, fee)
	      .exec(function(err, updatedApplicationfees){
	      	if (err) return cb(err);
	      	cb(null, updatedApplicationfees[0]);
	      });
	    });
	},
}
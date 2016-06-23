/**
 * Stripe Refund Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#refunds
 */

module.exports = {
	
	autoPK: false,
	attributes: {

		id: {
			type: 'string', //"re_3IH1NqUxYmyx2n"
			primaryKey: true,
			unique: true
		},
		amount: {
			type: 'integer' //500
		},
		currency: {
			type: 'string' //"usd"
		},
		created: {
			type: 'datetime' //1389503275
		},
		object: {
			type: 'string' //"refund"
		},
		balance_transaction: {
			type: "string" //"txn_3IH1XgiGk6NelI"
		},
		metadata: {
			type: 'json' //{}
		},
		charge: {
			model: 'Charge' //"ch_3HzoDMtpbhBooS"
		},
		receipt_number: {
			type: 'string' //null
		},
		reason: {
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
	}
}
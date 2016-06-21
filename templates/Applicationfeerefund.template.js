/**
 * Stripe Applicationfeerefund Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#fee_refunds
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
			type: 'string', //"fr_xxxxxxxxx",
			primaryKey: true,
			unique: true
		},
		amount: {
			type: 'integer' //100
		},
		currency: {
			type: 'string' //"usd"
		},
		created: {
			type: 'datetime' //1428165432
		},
		object: {
			type: 'string' //"fee_refund"
		},
		balance_transaction: {
			type: 'string' //null
		},
		metadata: {
			type: 'json' // {}
		},
		fee: {
			model: 'Applicationfee' //"fee_xxxxxxxxxx"
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
}
/**
 * Stripe Alipay Account Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#alipay_accounts
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		
		id: {
			type: 'string', //"aliacc_16q4o6Bw8aZ7QiYmdCfHA1U9"
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"alipay_account"
		},
		livemode: {
			type: 'boolean' //false
		},
		created: {
			type: 'datetime' //1443458934
		},
		username: {
			type: 'string' //"test@example.com"
		},
		fingerprint: {
			type: 'string' //"fw63Hiw2UYvAUyi2"
		},
		used: {
			type: 'boolean' //false
		},
		reusable: {
			type: 'boolean' //false
		},
		payment_amount: {
			type: 'integer' //1000
		},
		payment_currency: {
			type: 'string' //"usd"
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
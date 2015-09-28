/**
 * Stripe Bank Account Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#bank_accounts
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		id: {
	  		type: 'string', //"ba_16q4nxBw8aZ7QiYmwqM3lvdR"
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"bank_account"
		},
		last4: {
			type: 'string' //"6789"
		},
		country: {
			type: 'string' //"US"
		},
		currency: {
			type: 'string' //"usd"
		},
		status: {
			type: 'string' //"new"
		},
		fingerprint: {
			type: 'string' //"4bS4RP1zGQ1IeDdc"
		},
		routing_number: {
			type: 'string' //"110000000"
		},
		bank_name: {
			type: 'string' //"STRIPE TEST BANK"
		},
		account: {
			type: 'string' //"acct_15SXCKBw8aZ7QiYm"
		},
		default_for_currency: {
			type: 'boolean' //false
		},
		metadata: {
			type: 'json'
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	}
}
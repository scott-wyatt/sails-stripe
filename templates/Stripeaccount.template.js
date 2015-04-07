/**
 * Stripe Account Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#account_object
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"acct_xxxxxxxxxxxxxxx",
			primaryKey: true,
    		unique: true
		},
		email: {
			type: 'email'
		},
		statement_descriptor: {
			type: 'string'
		},
		display_name: {
			type: 'string'
		},
		timezone: {
			type: 'string'
		},
		details_submitted: {
			type: 'boolean'
		},
		charges_enabled: {
			type: 'boolean'
		},
		transfers_enabled: {
			type: 'boolean'
		},
		currencies_supported: {
			type: 'array'
		},
		default_currency: {
			type: 'string'
		},
		country: {
			type: 'string'
		},
		object: {
			type: 'string'
		},
		business_name: {
			type: 'string'
		},
		business_url: {
			type: 'string'
		},
		support_phone: {
			type: 'string'
		},
		business_logo: {
			type: 'string'
		},
		managed: {
			type: 'boolean'
		},
		product_description: {
			type: 'string'
		},
		debit_negative_balances: {
			type: 'boolean'
		},
		bank_accounts: {
			type: 'json'
		},
		verification: {
			type: 'json'
		},
		transfer_schedule: {
			type: 'json'
		},
		tos_acceptance: {
			type: 'json'
		},
		legal_entity: {
			type: 'json'
		},
		decline_charge_on: {
			type: 'json'
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	},

	// Stripe Webhook account.updated
	stripeAccountUpdated: function (account, cb) {

		Stripeaccount.findOrCreate(account.id, account)
	    .exec(function (err, foundAccount){
	      if (err) return cb(err);
	      Stripeaccount.update(foundAccount.id, account)
	      .exec(function(err, updatedAccounts){
	      	if (err) return cb(err);
	      	cb(null, updatedAccounts[0]);
	      });
	    });
	},

	// Stripe Webhook account.application.deauthorized
	stripeAccountApplicationDeauthorized: function (application, cb) {

		//Occurs whenever a user deauthorizes an application. Sent to the related application only.
		//Custom logic to handle when an application was deauthorized
		
		cb(null, application);
	}
}
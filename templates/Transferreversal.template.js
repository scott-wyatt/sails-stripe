/**
 * Stripe Transferreversal Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#transfer_reversals
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"trr_xxxxxxxxxxxx"
			primaryKey: true,
    		unique: true
		},
		amount: {
			type: 'integer' //90800
		},
		currency: {
			type: 'string' //"usd"
		},
		created: {
			type: 'datetime' //1428165432
		},
		object: {
			type: 'string' //"transfer_reversal"
		},
		balance_transaction: {
			type: 'string' //null
		},
		metadata: {
			type: 'json' // {}
		},
		transfer: {
			model: 'Transfer' //"tr_xxxxxxxxxxx"
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
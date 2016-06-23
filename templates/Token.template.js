/**
 * Stripe Token Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#token_object
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		
		id: {
			type: 'string', //"tok_16GhzzBw8aZ7QiYmauEtvWUU"
			primaryKey: true,
			unique: true
		},
		livemode: {
			type: 'boolean' //false
		},
		created: {
			type: 'datetime' //1435029779
		},
		used: {
			type: 'boolean' //false
		},
		object: {
			type: 'string' //"token"
		},
		type: {
			type: 'string' //"card"
		},
		card: {
			type: 'json'
		},
		client_ip: {
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
/**
 * Stripe Order Items Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#order
 */

module.exports = {
	
	//autoPK: false,
	
	attributes: {
		parent: {
			type: 'string' //"sku_74DEICYJxo7XQF"
		},
		object: {
			type: 'string' //"order_item"
		},
		type: {
			type: 'string' //"sku"
		},
		description: {
			type: 'string' //"T-shirt"
		},
		amount: {
			type: 'integer' //1500
		},
		currency: {
			type: 'string' //"usd"
		},
		quantity: {
			type: 'integer' //null
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	}
}
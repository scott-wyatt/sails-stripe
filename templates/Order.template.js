/**
 * Stripe Orders Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#orders
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		id: {
	  		type: 'string', //"or_16q4o6Bw8aZ7QiYmxfWfodKl"
			primaryKey: true,
    		unique: true
		},
		created: {
			type: 'datetime' //1443458925
		},
		updated: { 
			type: 'datetime' //1443458925
		},
		object: {
			type: 'string' //"order"
		},
		livemode: {
			type: 'boolean' //false
		},
		status: {
			type: 'string' //"created"
		},
		metadata: {
			type: 'json'
		},
		customer: {
			model: 'Customer'
		},
		shipping: {
			type: 'json'
		},
		email: {
			type: 'string' //null
		},
		items: {
			type: 'array'
		},
		shipping_methods: {
			type: 'array'
		},
		selected_shipping_method: {
			type: 'string'
		},
		amount: {
			type: 'integer' //1500
		},
		currency: {
			type: 'string' //"usd"
		},
		application_fee: {
			type: 'integer' //null
		},
		charge: {
			model: 'Charge'
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
		if(values.updated){
			values.updated = new Date(values.updated * 1000);
		}
		cb();
	},

	// Stripe Webhook order.created
	stripeOrderCreated: function (order, cb) {

		Order.findOrCreate(order.id, order)
	    .exec(function (err, foundOrder){
	      if (err) return cb(err);
	      if (foundOrder.lastStripeEvent > order.lastStripeEvent) return cb(null, foundOrder);
	      if (foundOrder.lastStripeEvent == order.lastStripeEvent) return Order.afterStripeOrderCreated(foundOrder, function(err, order){ return cb(err, order)});
	      Order.update(foundOrder.id, order)
	      .exec(function(err, updatedOrder){
	      	if (err) return cb(err);
	      	if (!updatedOrder) return cb(null,null);
	      	Order.afterStripeOrderCreated(updatedOrder[0], function(err, order){
	      		cb(err, order);
	      	});
	      });
	    });
	},

	afterStripeOrderCreated: function(order, next){
		//Do somethings after an invoice item is created
		next(null, order);
	},

	// Stripe Webhook order.updated
	stripeOrderUpdated: function (order, cb) {

		Order.findOrCreate(order.id, order)
	    .exec(function (err, foundOrder){
	      if (err) return cb(err);
	      if (foundOrder.lastStripeEvent > order.lastStripeEvent) return cb(null, foundOrder);
	      if (foundOrder.lastStripeEvent == order.lastStripeEvent) return Order.afterStripeOrderUpdated(foundOrder, function(err, order){ return cb(err, order)});
	      Order.update(foundOrder.id, order)
	      .exec(function(err, updatedOrder){
	      	if (err) return cb(err);
	      	if (!updatedOrder) return cb(null,null);
	      	Order.afterStripeOrderUpdated(updatedOrder[0], function(err, order){
	      		cb(err, order);
	      	});
	      });
	    });
	},

	afterStripeOrderUpdated: function(order, next){
		//Do somethings after an invoice item is created
		next(null, order);
	},

	// Stripe Webhook order.payment_succeeded
	stripeOrderPaymentSucceeded: function (order, cb) {

		Order.findOrCreate(order.id, order)
	    .exec(function (err, foundOrder){
	      if (err) return cb(err);
	      if (foundOrder.lastStripeEvent > order.lastStripeEvent) return cb(null, foundOrder);
	      if (foundOrder.lastStripeEvent == order.lastStripeEvent) return Order.afterStripeOrderPaymentSucceeded(foundOrder, function(err, order){ return cb(err, order)});
	      Order.update(foundOrder.id, order)
	      .exec(function(err, updatedOrders){
	      	if (err) return cb(err);
	      	if (!updatedOrders) return cb(null, null);
	      	Order.afterStripeOrderPaymentSucceeded(updatedOrders[0], function(err, order){
	      		cb(err, order);
	      	});
	      });
	    });
	},

	afterStripeOrderPaymentSucceeded: function(order, next){
		//Do somethings after an order payment succeeded
		next(null, order);
	},

	// Stripe Webhook order.payment_failed
	stripeOrderPaymentFailed: function (order, cb) {

		Order.findOrCreate(order.id, order)
	    .exec(function (err, foundOrder){
	      if (err) return cb(err);
	      if (foundOrder.lastStripeEvent > order.lastStripeEvent) return cb(null, foundOrder);
	      if (foundOrder.lastStripeEvent == order.lastStripeEvent) return Order.afterStripeOrderPaymentFailed(foundOrder, function(err, order){ return cb(err, order)});
	      Order.update(foundOrder.id, order)
	      .exec(function(err, updatedOrders){
	      	if (err) return cb(err);
	      	if (!updatedOrders) return cb(null, null);
	      	Order.afterStripeOrderPaymentFailed(updatedOrders[0], function(err, order){
	      		cb(err, order);
	      	});
	      });
	    });
	},

	afterStripeOrderPaymentFailed: function(order, next){
		//Do somethings after an order payment succeeded
		next(null, order);
	}
}
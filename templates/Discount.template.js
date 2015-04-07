/**
 * Stripe Discount Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#discounts
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"Trial"
			primaryKey: true,
    		unique: true
		},
		coupon: {
			type: 'json' //josn
		},
		start: {
			type: 'datetime' //1390790362
		},
		object: {
			type: 'string' //"discount"
		},
		customer: {
			model: 'Customer' //"cus_5nCK3XjDZ9bU3d"
		},
		subscription: {
			model: 'Subscription' //null
		},
		end: {
			type: 'datetime' //null
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}

	},

	beforeValidate: function (values, cb){
		if(values.start){
			values.start = new Date(values.start * 1000);
		}
		if(values.end){
			values.end = new Date(values.end * 1000);
		}
		cb();
	},

	// Stripe Webhook customer.discount.created
	stripeCustomerDiscountCreated: function (discount, cb) {

		Discount.findOrCreate(discount.id, discount)
	    .exec(function (err, foundDiscount){
	      if (err) return cb(err);
	      if (foundDiscount.lastStripeEvent > discount.lastStripeEvent) return cb(null, foundDiscount);
	      if (foundDiscount.lastStripeEvent == discount.lastStripeEvent) return Discount.afterStripeCustomerDiscountCreated(foundDiscount, function(err, discount){ return cb(err, discount)});
	      Discount.update(foundDiscount.id, discount)
	      .exec(function(err, updatedDiscounts){
	      	if (err) return cb(err);
	      	if (!updatedDiscounts) return cb(null, null);
	      	Discount.afterStripeCustomerDiscountCreated(updatedDiscounts[0], function(err, discount){
	      		cb(err, discount);
	      	});
	      });
	    });
	},

	afterStripeCustomerDiscountCreated: function(discount, next){
		//Do somethings after a discount is created
		next(null, discount);
	},

	// Stripe Webhook customer.discount.updated
	stripeCustomerDiscountUpdated: function (discount, cb) {

		Discount.findOrCreate(discount.id, discount)
	    .exec(function (err, foundDiscount){
	      if (err) return cb(err);
	      if (foundDiscount.lastStripeEvent > discount.lastStripeEvent) return cb(null, foundDiscount);
	      if (foundDiscount.lastStripeEvent == discount.lastStripeEvent) return Discount.afterStripeCustomerDiscountUpdated(foundDiscount, function(err, discount){ return cb(err, discount)});
	      Discount.update(foundDiscount.id, discount)
	      .exec(function(err, updatedDiscounts){
	      	if (err) return cb(err);
	      	if (!updatedDiscounts) return cb(null, null);
	      	Discount.afterStripeCustomerDiscountUpdated(updatedDiscounts[0], function(err, discount){
	      		cb(err, discount);
	      	});
	      });
	    });
	},

	afterStripeCustomerDiscountUpdated: function(discount, next){
		//Do somethings after a discount is created
		next(null, discount);
	},

	// Stripe Webhook customer.discount.deleted
	stripeCustomerDiscountDeleted: function (discount, cb) {

		Discount.destroy(discount.id)
	    .exec(function (err, destroyedDiscounts){
	      if (err) return cb(err);
	      if (!destroyedDiscounts) return cb(null, null);
	      Discount.afterStripeCustomerDiscountDeleted(destroyedDiscounts[0], function(err, discount){
	      	cb(err, discount);
	      });
	    });
	},

	afterStripeCustomerDiscountDeleted: function(discount, next){
		//Do somethings after a discount is created
		next(null, discount);
	}
}
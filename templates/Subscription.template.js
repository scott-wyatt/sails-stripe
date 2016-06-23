/**
 * Stripe Subscription Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#subscriptions
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
			type: 'string', // sub_xxxxxxxxxx
			primaryKey: true,
			unique: true
		},
		plan: {
			type: 'json'
		},
		customer: {
			model: 'Customer'
		},
		object: {
			type: 'string' // "subscription"
		},
		start: {
			type: 'datetime'
		},
		status: {
			type: 'string'
		},
		cancel_at_period_end: {
			type: 'boolean'
		},
		current_period_start: {
			type: 'datetime'
		},
		current_period_end: {
			type: 'datetime'
		},
		ended_at: {
			type: 'datetime'
		},
		trial_start: {
			type: 'datetime'
		},
		trial_end: {
			type: 'datetime'
		},
		canceled_at: {
			type: 'datetime'
		},
		quantity: {
			type: 'integer'
		},
		application_fee_percent: {
			type: 'float'
		},
		discount: {
			type: 'json'
		},
		tax_percent: {
			type: 'float'
		},
		metadata: {
			type: 'json'
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
		if(values.current_period_start){
			values.current_period_start = new Date(values.current_period_start * 1000);
		}
		if(values.current_period_end){
			values.current_period_end = new Date(values.current_period_end * 1000);
		}
		if(values.ended_at){
			values.ended_at = new Date(values.ended_at * 1000);
		}
		if(values.trial_start){
			values.trial_start = new Date(values.trial_start * 1000);
		}
		if(values.trial_end){
			values.trial_end = new Date(values.trial_end * 1000);
		}
		if(values.canceled_at){
			values.canceled_at = new Date(values.canceled_at * 1000);
		}
		cb();
	},

	// Stripe Webhook customer.subscription.created
	stripeCustomerSubscriptionCreated: function (subscription, cb) {

		Subscription.findOrCreate(subscription.id, subscription)
	    .exec(function (err, foundSubscription){
	      if (err) return cb(err);
	      if (foundSubscription.lastStripeEvent > subscription.lastStripeEvent) return cb(null, foundSubscription);
	      if (foundSubscription.lastStripeEvent == subscription.lastStripeEvent) return Subscription.afterStripeCustomerSubscriptionCreated(foundSubscription, function(err, subscription){ return cb(err, subscription)});
	      Subscription.update(foundSubscription.id, subscription)
	      .exec(function(err, updatedSubscriptions){
	      	if (err) return cb(err);
	      	if(!updatedSubscriptions) return cb(null, null);
	      	Subscription.afterStripeCustomerSubscriptionCreated(updatedSubscriptions[0], function(err, subscription){
	      		cb(err, subscription);
	      	});
	      });
	    });
	},

	afterStripeCustomerSubscriptionCreated: function(subscription, next){
		//Do something after subscription is created
		next(null, subscription);
	},

	// Stripe Webhook customer.subscription.updated
	stripeCustomerSubscriptionUpdated: function (subscription, cb) {

		Subscription.findOrCreate(subscription.id, subscription)
	    .exec(function (err, foundSubscription){
	      if (err) return cb(err);
	      if (foundSubscription.lastStripeEvent > subscription.lastStripeEvent) return cb(null, foundSubscription);
	      if (foundSubscription.lastStripeEvent == subscription.lastStripeEvent) return Subscription.afterStripeCustomerSubscriptionUpdated(foundSubscription, function(err, subscription){ return cb(err, subscription)});
	      Subscription.update(foundSubscription.id, subscription)
	      .exec(function(err, updatedSubscriptions){
	      	if (err) return cb(err);
	      	if(!updatedSubscriptions) return cb(null, null);
	      	Subscription.afterStripeCustomerSubscriptionUpdated(updatedSubscriptions[0], function(err, subscription){
	      		cb(err, subscription);
	      	});
	      });
	    });
	},

	afterStripeCustomerSubscriptionUpdated: function(subscription, next){
		//Do something after subscription is updated
		next(null, subscription);
	},

	// Stripe Webhook customer.subscription.deleted
	stripeCustomerSubscriptionDeleted: function (subscription, cb) {

		Subscription.destroy(subscription.id)
	    .exec(function (err, destroyedSubscriptions){
	      if (err) return cb(err);
	      if (!destroyedSubscriptions) return cb(null, subscription);
	      Subscription.afterStripeCustomerSubscriptionDeleted(destroyedSubscriptions[0], function(err, subscription){
	      	cb(err, subscription);
	      });
	    });
	},

	afterStripeCustomerSubscriptionDeleted: function(subscription, next){
		//Do something after subscription is destroyed
		next(null, subscription);
	},

	// Stripe Webhook customer.subscription.trial_will_end
	stripeCustomerSubscriptionTrial: function (subscription, cb) {
		//Occurs three days before the trial period of a subscription is scheduled to end.
		//Custom logic to handle that: add an email or notification or something.

	    Subscription.findOrCreate(subscription.id, subscription)
	    .exec(function (err, foundSubscription){
	      if (err) return cb(err);
	      if (foundSubscription.lastStripeEvent > subscription.lastStripeEvent) return cb(null, foundSubscription);
	      if (foundSubscription.lastStripeEvent == subscription.lastStripeEvent) return Subscription.afterStripeCustomerSubscriptionTrial(foundSubscription, function(err, subscription){ return cb(err, subscription)});
	      Subscription.update(foundSubscription.id, subscription)
	      .exec(function(err, updatedSubscriptions){
	      	if (err) return cb(err);
	      	if(!updatedSubscriptions) return cb(null, null);
	      	Subscription.afterStripeCustomerSubscriptionTrial(updatedSubscriptions[0], function(err, subscription){
	      		cb(err, subscription);
	      	});
	      });
	    });
	    
	},

	afterStripeCustomerSubscriptionTrial: function(subscription, next){
		//Do something after subscription trail wanring
		next(null, subscription);
	}
}
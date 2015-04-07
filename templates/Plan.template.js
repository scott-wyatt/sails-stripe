/**
 * Stripe Plan Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#plans
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
			type: 'string',
			primaryKey: true,
    		unique: true
		},
		interval: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		created: {
			type: 'datetime'
		},
		amount: {
			type: 'string'
		},
		currency: {
			type: 'string'
		},
		plan_id: {
			type: 'string'
		},
		object: {
			type: 'string'
		},
		livemode: {
			type: 'boolean'
		},
		interval_count: {
			type: 'integer'
		},
		trial_period_days: {
			type: 'integer'
		},
		metadata: {
			type: 'json'
		},
		statement_descriptor: {
			type: 'string'
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

	// Stripe Webhook plan.created
	stripePlanCreated: function (plan, cb) {

		Plan.findOrCreate(plan.id, plan)
	    .exec(function (err, foundPlan){
	      if (err) return cb(err);
	      if (foundPlan.lastStripeEvent > plan.lastStripeEvent) return cb(null, foundPlan);
	      if (foundPlan.lastStripeEvent == plan.lastStripeEvent) return Plan.afterStripePlanCreated(foundPlan, function(err, plan){ return cb(err, plan)});
	      Plan.update(foundPlan.id, plan)
	      .exec(function(err, updatedPlans){
	      	if (err) return cb(err);
	      	if (!updatedPlans) return cb(null, null);
	      	Plan.afterStripePlanCreated(updatedPlans[0], function(err, plan){
	      		cb(err, plan);
	      	});
	      });
	    });
	},

	afterStripePlanCreated: function(plan, next){
		//Do somethings after a plan is created
		next(null, plan);
	},

	// Stripe Webhook plan.updated
	stripePlanUpdated: function (plan, cb) {

		Plan.findOrCreate(plan.id, plan)
	    .exec(function (err, foundPlan){
	      if (err) return cb(err);
	      if (foundPlan.lastStripeEvent > plan.lastStripeEvent) return cb(null, foundPlan);
	      if (foundPlan.lastStripeEvent == plan.lastStripeEvent) return Plan.afterStripePlanUpdated(foundPlan, function(err, plan){ return cb(err, plan)});
	      Plan.update(foundPlan.id, plan)
	      .exec(function(err, updatedPlans){
	      	if (err) return cb(err);
	      	if (!updatedPlans) return cb(null, null);
	      	Plan.afterStripePlanUpdated(updatedPlans[0], function(err, plan){
	      		cb(err, plan);
	      	});
	      });
	    });
	},

	afterStripePlanUpdated: function(plan, next){
		//Do somethings after a plan is updated
		next(null, plan);
	},

	// Stripe Webhook plan.created
	stripePlanDeleted: function (plan, cb) {

		Plan.destroy(plan.id)
	    .exec(function (err, destroyedPlans){
	    	if (err) return cb(err);
	    	if (!destroyedPlans) return cb(null, null);
	    	Plan.afterStripePlanDeleted(destroyedPlans[0], function(err, plan){
      			cb(err, plan);
      		});
	    });
	},

	afterStripePlanDeleted: function(plan, next){
		//Do somethings after a plan is destroyed
		next(null, plan);
	}
}
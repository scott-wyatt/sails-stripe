/**
 * Stripe Dispute Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#disputes
 */

module.exports = {
	
	attributes: {

		charge: {
			model:'Charge' //"ch_5mXfl1ok3CV6xn"
		},
		amount: {
			type: 'integer'//1000
		},
		created: {
			type: 'datetime' //1428165431
		},
		status: {
			type: 'string' //"needs_response"
		},
		livemode: {
			type: 'boolean' //false
		},
		currency: {
			type: 'string' //"usd"
		},
		object: {
			type: 'string' //"dispute"
		},
		reason: {
			type: 'string' //"general"
		},
		is_charge_refundable: {
			type: 'boolean' //false
		},
		balance_transactions: {
			type: 'array' //[],
		},
		evidence_details: {
			type: 'json' //{}
		},
		evidence: {
			type: 'json' //{}
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
		if(values.created){
			values.created = new Date(values.created * 1000);
		}
		cb();
	},

	// Stripe Webhook charge.dispute.created
	stripeChargeDisputeCreated: function (dispute, cb) {

		Dispute.findOrCreate(dispute.id, dispute)
	    .exec(function (err, foundDispute){
	      if (err) return cb(err);
	      if (foundDispute.lastStripeEvent > dispute.lastStripeEvent) return cb(null, foundDispute);
	      if (foundDispute.lastStripeEvent == dispute.lastStripeEvent) return Dispute.afterStripeChargeDisputeCreated(foundDispute, function(err, dispute){ return cb(err, dispute)});
	      Dispute.update(foundDispute.id, dispute)
	      .exec(function(err, updatedDisputes){
	      	if (err) return cb(err);
	      	if (!updatedDisputes) return cb(null, null);
	      	Dispute.afterStripeChargeDisputeCreated(updatedDisputes[0], function(err, dispute){
	      		cb(err, dispute);
	      	});
	      });
	    });
	},

	afterStripeChargeDisputeCreated: function(dispute, next){
		//Do somethings after a charge dispute is created
		next(null, dispute);
	},

	// Stripe Webhook charge.dispute.updated
	stripeChargeDisputeUpdated: function (dispute, cb) {

		Dispute.findOrCreate(dispute.id, dispute)
	    .exec(function (err, foundDispute){
	      if (err) return cb(err);
	      if (foundDispute.lastStripeEvent > dispute.lastStripeEvent) return cb(null, foundDispute);
	      if (foundDispute.lastStripeEvent == dispute.lastStripeEvent) return Dispute.afterStripeChargeDisputeUpdated(foundDispute, function(err, dispute){ return cb(err, dispute)});
	      Dispute.update(foundDispute.id, dispute)
	      .exec(function(err, updatedDisputes){
	      	if (err) return cb(err);
	      	if (!updatedDisputes) return cb(null, null);
	      	Dispute.afterStripeChargeDisputeUpdated(updatedDisputes[0], function(err, dispute){
	      		cb(err, dispute);
	      	});
	      });
	    });
	},

	afterStripeChargeDisputeUpdated: function(dispute, next){
		//Do somethings after a charge dispute is updated
		next(null, dispute);
	},

	// Stripe Webhook charge.dispute.closed
	stripeChargeDisputeClosed: function (dispute, cb) {

		Dispute.findOrCreate(dispute.id, dispute)
	    .exec(function (err, foundDispute){
	      if (err) return cb(err);
	      if (foundDispute.lastStripeEvent > dispute.lastStripeEvent) return cb(null, foundDispute);
	      if (foundDispute.lastStripeEvent == dispute.lastStripeEvent) return Dispute.afterStripeChargeDisputeClosed(foundDispute, function(err, dispute){ return cb(err, dispute)});
	      Dispute.update(foundDispute.id, dispute)
	      .exec(function(err, updatedDisputes){
	      	if (err) return cb(err);
	      	if (!updatedDisputes) return cb(null, null);
	      	Dispute.afterStripeChargeDisputeClosed(updatedDisputes[0], function(err, dispute){
	      		cb(err, dispute);
	      	});
	      });
	    });
	},

	afterStripeChargeDisputeClosed: function(dispute, next){
		//Do somethings after a charge dispute is updated
		next(null, dispute);
	},

	// Stripe Webhook charge.dispute.funds_withdrawn
	stripeChargeDisputeFundsWithdrawn: function (dispute, cb) {

		Dispute.findOrCreate(dispute.id, dispute)
	    .exec(function (err, foundDispute){
	      if (err) return cb(err);
	      if (foundDispute.lastStripeEvent > dispute.lastStripeEvent) return cb(null, foundDispute);
	      if (foundDispute.lastStripeEvent == dispute.lastStripeEvent) return Dispute.afterStripeChargeDisputeFundsWithdrawn(foundDispute, function(err, dispute){ return cb(err, dispute)});
	      Dispute.update(foundDispute.id, dispute)
	      .exec(function(err, updatedDisputes){
	      	if (err) return cb(err);
	      	if (!updatedDisputes) return cb(null, null);
	      	Dispute.afterStripeChargeDisputeFundsWithdrawn(updatedDisputes[0], function(err, dispute){
	      		cb(err, dispute);
	      	});
	      });
	    });
	},

	afterStripeChargeDisputeFundsWithdrawn: function(dispute, next){
		//Do somethings after a charge dispute funds withdrawn
		next(null, dispute);
	},

	stripeChargeDisputeFundsReinstated: function (dispute, cb) {

		Dispute.findOrCreate(dispute.id, dispute)
	    .exec(function (err, foundDispute){
	      if (err) return cb(err);
	      if (foundDispute.lastStripeEvent > dispute.lastStripeEvent) return cb(null, foundDispute);
	      if (foundDispute.lastStripeEvent == dispute.lastStripeEvent) return Dispute.afterStripeChargeDisputeFundsReinstated(foundDispute, function(err, dispute){ return cb(err, dispute)});
	      Dispute.update(foundDispute.id, dispute)
	      .exec(function(err, updatedDisputes){
	      	if (err) return cb(err);
	      	if (!updatedDisputes) return cb(null, null);
	      	Dispute.afterStripeChargeDisputeFundsReinstated(updatedDisputes[0], function(err, dispute){
	      		cb(err, dispute);
	      	});
	      });
	    });
	},

	afterStripeChargeDisputeFundsReinstated: function(dispute, next){
		//Do somethings after a charge dispute is reinstated
		next(null, dispute);
	}
}
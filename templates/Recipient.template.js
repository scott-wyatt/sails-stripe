/**
 * Stripe Recipient Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#recipients
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"rp_3Uh38RCOt3igvD"
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"recipient"
		},
		created: {
			type: 'datetime' //1392367798
		},
		livemode: {
			type: 'boolean' //false
		},
		type: {
			type: 'string' //"individual"
		},
		description: {
			type: 'string' //"Added through Widget"
		},
		email: {
			type: 'email' //"michael@widget"
		},
		name: {
			type: 'string' //"Mike"
		},
		verified: {
			type: 'boolean' //false
		},
		metadata: {
			type: 'json' //{}
		},
		active_account: {
			type: 'string' //null
		},
		cards: {
			type: 'json' // {}
		},
		default_card: {
			model: 'Card' //null
		},
		migrated_to: {
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
	},

	// Stripe Webhook recipient.created
	stripeRecipientCreated: function (recipient, cb) {

		Recipient.findOrCreate(recipient.id, recipient)
	    .exec(function (err, foundRecipient){
	      if (err) return cb(err);
	      if (foundRecipient.lastStripeEvent >= recipient.lastStripeEvent) return cb(null, foundRecipient);
	      Recipient.update(foundRecipient.id, recipient)
	      .exec(function(err, updatedRecipients){
	      	if (err) return cb(err);
	      	if (!updatedRecipients) return cb(null, null);
	      	Recipient.afterStripeRecipientCreated(updatedRecipients[0], function(err, recipient){
	      		cb(err, recipient);
	      	});
	      });
	    });
	},

	afterStripeRecipientCreated: function (recipient, next){
		//Do somethings after recipient created
		next(null, recipient);
	},

	// Stripe Webhook recipient.updated
	stripeRecipientUpdated: function (recipient, cb) {

		Recipient.findOrCreate(recipient.id, recipient)
	    .exec(function (err, foundRecipient){
	      if (err) return cb(err);
	      if (foundRecipient.lastStripeEvent >= recipient.lastStripeEvent) return cb(null, foundRecipient);
	      Recipient.update(foundRecipient.id, recipient)
	      .exec(function(err, updatedRecipients){
	      	if (err) return cb(err);
	      	if (!updatedRecipients) return cb(null, null);
	      	Recipient.afterStripeRecipientUpdated(updatedRecipients[0], function(err, recipient){
	      		cb(err, recipient);
	      	});
	      });
	    });
	},

	afterStripeRecipientUpdated: function (recipient, next){
		//Do somethings after recipient updated
		next(null, recipient);
	},

	// Stripe Webhook recipient.deleted
	stripeRecipientDeleted: function (recipient, cb) {

		Recipient.destroy(recipient.id)
	    .exec(function (err, destroyedRecipients){
	      if (err) return cb(err);
	      if (!destroyedRecipients) return cb(null, null);
	      Recipient.afterStripeRecipientDeleted(destroyedRecipients[0], function(err, recipient){
	      	cb(err, recipient);
	      });
	    });
	},

	afterStripeRecipientDeleted: function (recipient, next){
		//Do somethings after recipient deleted
		next(null, recipient);
	}
}
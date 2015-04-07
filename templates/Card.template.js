/**
 * Stripe Card Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#cards
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"card_5R82bJXG5gm5bt"
			primaryKey: true,
    		unique: true
		},
		object: { 
			type: 'string' //"card"
		},
		last4: {
			type: 'string' //"4242"
		},
		brand: { 
			type: 'string' //"Visa"
		},
		funding: {
			type: 'string' //"credit"
		},
		exp_month: {
			type: 'integer' //12
		},
		exp_year: {
			type: 'integer' //2018
		},
		country: {
			type: 'string' //"US"
		},
		name: {
			type: 'string' //"Scottie"
		},
		address_line1: {
			type: 'string' //"undefined"
		},
		address_line2: { 
			type: 'string' //"undefined"
		},
		address_city: { 
			type: 'string' //"undefined"
		},
		address_state: {
			type: 'string' //"undefined"
		},
		address_zip: {
			type: 'string' //"undefined"
		},
		address_country: { 
			type: 'string' //"undefined"
		},
		cvc_check: {
			type: 'string' //"pass"
		},
		address_line1_check: {
			type: 'string' //"pass"
		},
		address_zip_check: {
			type: 'string' //"pass"
		},
		dynamic_last4: {
			type: 'string' //"pass" (For Apple Pay integrations only.) The last four digits of the device account number.
		},
		metadata: {
			type: 'json'//{}
		},
		customer: {
			model: 'Customer'// "cus_5MM1RcCBWYpcy7"
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}

	},
	
	// Stripe Webhook customer.card.created
	stripeCustomerCardCreated: function (card, cb) {

		Card.findOrCreate(card.id, card)
	    .exec(function (err, foundCard){
	      if (err) return cb(err);
	      if (foundCard.lastStripeEvent >= card.lastStripeEvent) return cb(null, foundCard);
	      Card.update(foundCard.id, card)
	      .exec(function(err, updatedCards){
	      	if (err) return cb(err);
	      	if (!updatedCards) return cb(null, null);
	      	Card.afterStripeCustomerCardCreated(updatedCards[0], function(err, card){
	      		cb(err, card);
	      	});
	      });
	    });
	},

	afterStripeCustomerCardCreated: function (card, next) {
		//Add somethings to do after a card is created
		next(null, card);
	},

	// Stripe Webhook customer.card.updated
	stripeCustomerCardUpdated: function (card, cb) {

		Card.findOrCreate(card.id, card)
	    .exec(function (err, foundCard){
	      if (err) return cb(err);
	      if (foundCard.lastStripeEvent >= card.lastStripeEvent) return cb(null, foundCard);
	      Card.update(foundCard.id, card)
	      .exec(function(err, updatedCards){
	      	if (err) return cb(err);
	      	if (!updatedCards) return cb(null, null);
	      	Card.afterStripeCustomerCardUpdated(updatedCards[0], function(err, card){
	      		cb(err, card);
	      	});
	      });
	    });
	},

	afterStripeCustomerCardUpdated: function(card, next){
		//Add somethings to do after a card is updated
		next(null, card);
	},

	// Stripe Webhook customer.card.deleted
	stripeCustomerCardDeleted: function (card, cb) {

		Card.destroy(card.id)
	    .exec(function (err, destroyedCards){
	      if (err) return cb(err);
	      if (!destroyedCards) return cb(null, null);
	      Card.afterStripeCustomerCardDeleted(destroyedCards[0], function(err, card){
	      	cb(null, card);
	      });
	    });
	},

	afterStripeCustomerCardDeleted: function(card, next){
		//Add somethings to do after a card is deleted
		next(null, card);	
	}

}
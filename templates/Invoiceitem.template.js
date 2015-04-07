/**
 * Stripe Invoiceitem Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#invoiceitems
 */

module.exports = {
	
	autoPK: false,
	attributes: {

		id: {
			type: 'string',
			primaryKey: true,
    		unique: true
		},
		object:{
			type: 'string' //"line_item",
		}, 
		type: {
			type: 'string' //"invoiceitem",
		},
		livemode: {
			type: 'boolean' //false
		},
		amount: {
			type: 'integer' //99999
		},
		currency: {
			type: 'string' //"usd"
		},
		proration: {
			type: 'boolean' //true
		},
		period: {
			type: 'json' // {"start": 1422575156, "end": 1422575156}
		},
		invoice: {
			model: 'Invoice' // "in_5m2UNzEY8YCWFi",
		},
		subscription: {
			model: 'Subscription' //"sub_5bfJWiXp3MNZpF"
		},
		quantity: {
			type: 'integer' //1
		},
		plan: {
			type: 'json' // {"interval": "week","name": "Bar","created": 1422575143,"amount": 100000,"currency": "usd","id": "18966bar1422575142","object": "plan","livemode": false,"interval_count": 1,"trial_period_days": null,metadata: {},"statement_descriptor": null}	
		},
		description: {
			type: 'string' //"Remaining time on Bar after 29 Jan 2015"
		},
		metadata: {
			type: 'json'
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	},

	// Stripe Webhook invoiceitem.created
	stripeInvoiceitemCreated: function (invoiceitem, cb) {

		Invoiceitem.findOrCreate(invoiceitem.id, invoiceitem)
	    .exec(function (err, foundInvoiceitem){
	      if (err) return cb(err);
	      if (foundInvoiceitem.lastStripeEvent >= invoiceitem.lastStripeEvent) return cb(null, foundInvoiceitem);
	      Invoiceitem.update(foundInvoiceitem.id, invoiceitem)
	      .exec(function(err, updatedInvoiceitem){
	      	if (err) return cb(err);
	      	if (!updatedInvoiceitem) return cb(null,null);
	      	Invoiceitem.afterStripeInvoiceitemCreated(updatedInvoiceitem[0], function(err, invoiceitem){
	      		cb(err, invoiceitem);
	      	});
	      });
	    });
	},

	afterStripeInvoiceitemCreated: function(invoiceitem, next){
		//Do somethings after an invoice item is created
		next(null, invoiceitem);
	},

	// Stripe Webhook invoiceitem.updated
	stripeInvoiceitemUpdated: function (invoiceitem, cb) {

		Invoiceitem.findOrCreate(invoiceitem.id, invoiceitem)
	    .exec(function (err, foundInvoiceitem){
	      if (err) return cb(err);
	      if (foundInvoiceitem.lastStripeEvent >= invoiceitem.lastStripeEvent) return cb(null, foundInvoiceitem);
	      Invoiceitem.update(foundInvoiceitem.id, invoiceitem)
	      .exec(function(err, updatedInvoiceitem){
	      	if (err) return cb(err);
	      	if (!updatedInvoiceitem) return cb(null,null);
	      	Invoiceitem.afterStripeInvoiceitemUpdated(updatedInvoiceitem[0], function(err, invoiceitem){
	      		cb(err, invoiceitem);
	      	});
	      });
	    });
	},

	afterStripeInvoiceitemUpdated: function(invoiceitem, next){
		//Do somethings after an invoice item is created
		next(null, invoiceitem);
	},

	// Stripe Webhook invoiceitem.deleted
	stripeInvoiceitemDeleted: function (invoiceitem, cb) {

		Invoiceitem.destroy(invoiceitem.id)
	    .exec(function (err, destroyedInvoiceitems){
	      if (err) return cb(err);
	      if (!destroyedInvoiceitems) return cb(null, null);
	      Invoiceitem.afterStripeInvoiceitemDeleted(destroyedInvoiceitems[0], function(err, invoiceitem){
	      	cb(err, invoiceitem);
	      });
	    });
	},

	afterStripeInvoiceitemDeleted: function(invoiceitem, next){
		//Do somethings after an invoice item is created
		next(null, invoiceitem);
	}
}
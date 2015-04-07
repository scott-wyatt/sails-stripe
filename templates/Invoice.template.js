/**
 * Stripe Invoice Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#invoices
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		
		id: {
			type: 'string', //"in_5OfJeYHbLtvBJ7"
			primaryKey: true,
    		unique: true
		},
		date: {
			type: 'datetime' // 1416984752
		},
		period_start:{
			type: 'datetime' // 1416984752,
		},
		period_end: {
			type: 'datetime' //1419576752,
		},
		lines: {
			type: 'json'
		},
		subtotal: {
			type: 'integer' //29995,
		},
		total: {
			type: 'integer' //29995,
		},
		customer: {
			model: 'Customer' // "cus_5NKIMdRFc0TcW8"
		},
		object: {
			type: 'string' // "invoice",
		},
		attempted: {
			type: 'boolean'
		},
		closed: {
			type: 'boolean'
		},
		forgiven: {
			type: 'boolean'
		},
		paid: {
			type: 'boolean'
		},
		livemode: {
			type: 'boolean'
		},
		attempt_count: {
			type: 'integer' //1,
		},
		amount_due: {
			type: 'integer' //29995,
		},
		currency: {
			type: 'string' // "usd",
		},
		starting_balance: {
			type: 'integer' //0,
		},
		ending_balance: {
			type: 'integer' //0,
		},
		next_payment_attempt: {
			type: 'datetime' // null
		},
		webhooks_delivered_at: {
			type: 'datetime' // 1416984752
		},
		charge: {
			model: 'Charge' // "ch_5OgJ2PFbShUkxe",
		},
		discount: {
			type: 'json'
		},
		application_fee: {
			type: 'integer' //null
		},
		subscription: {
			model: 'subscription' // "sub_2v2VGqj8Syg0l8",
		},
		tax: {
			type: 'integer' //null,
		},
		tax_percent: {
			type: 'float' //null
		},
		metadata: {
			type: 'json'
		},
		statement_descriptor: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		receipt_number: {
			type: 'string'
		},

		//Added to Model and doesn't exists in Stripe
		lastStripeEvent: {
			type: 'datetime'
		}
	},

	beforeValidate: function (values, cb){
		if(values.date){
			values.date = new Date(values.date * 1000);
		}
		if(values.period_start){
			values.period_start = new Date(values.period_start * 1000);
		}
		if(values.period_end){
			values.period_end = new Date(values.period_end * 1000);
		}
		if(values.next_payment_attempt){
			values.next_payment_attempt = new Date(values.next_payment_attempt * 1000);
		}
		if(values.webhooks_delivered_at){
			values.webhooks_delivered_at = new Date(values.webhooks_delivered_at * 1000);
		}
		cb();
	},

	// Stripe Webhook invoice.created
	stripeInvoiceCreated: function (invoice, cb) {

		Invoice.findOrCreate(invoice.id, invoice)
	    .exec(function (err, foundInvoice){
	      if (err) return cb(err);
	      if (foundInvoice.lastStripeEvent >= invoice.lastStripeEvent) return cb(null, foundInvoice);
	      Invoice.update(foundInvoice.id, invoice)
	      .exec(function(err, updatedInvoices){
	      	if (err) return cb(err);
	      	if (!updatedInvoices) return cb(null, null);
	      	Invoice.afterStripeInvoiceCreated(updatedInvoices[0], function(err, invoice){
	      		cb(err, invoice);
	      	});
	      });
	    });
	},

	afterStripeInvoiceCreated: function(invoice, next){
		//Do somethings after an invoice is created
		next(null, invoice);
	},

	// Stripe Webhook invoice.updated
	stripeInvoiceUpdated: function (invoice, cb) {

		Invoice.findOrCreate(invoice.id, invoice)
	    .exec(function (err, foundInvoice){
	      if (err) return cb(err);
	      if (foundInvoice.lastStripeEvent >= invoice.lastStripeEvent) return cb(null, foundInvoice);
	      Invoice.update(foundInvoice.id, invoice)
	      .exec(function(err, updatedInvoices){
	      	if (err) return cb(err);
	      	if (!updatedInvoices) return cb(null, null);
	      	Invoice.afterStripeInvoiceUpdated(updatedInvoices[0], function(err, invoice){
	      		cb(err, invoice);
	      	});
	      });
	    });
	},

	afterStripeInvoiceUpdated: function(invoice, next){
		//Do somethings after an invoice is updated
		next(null, invoice);
	},

	// Stripe Webhook invoice.payment_succeeded
	stripeInvoicePaymentSucceeded: function (invoice, cb) {

		Invoice.findOrCreate(invoice.id, invoice)
	    .exec(function (err, foundInvoice){
	      if (err) return cb(err);
	      if (foundInvoice.lastStripeEvent >= invoice.lastStripeEvent) return cb(null, foundInvoice);
	      Invoice.update(foundInvoice.id, invoice)
	      .exec(function(err, updatedInvoices){
	      	if (err) return cb(err);
	      	if (!updatedInvoices) return cb(null, null);
	      	Invoice.afterStripeInvoicePaymentSucceeded(updatedInvoices[0], function(err, invoice){
	      		cb(err, invoice);
	      	});
	      });
	    });
	},

	afterStripeInvoicePaymentSucceeded: function(invoice, next){
		//Do somethings after an invoice payment succeeded
		next(null, invoice);
	},

	// Stripe Webhook invoice.payment_failed
	stripeInvoicePaymentFailed: function (invoice, cb) {

		Invoice.findOrCreate(invoice.id, invoice)
	    .exec(function (err, foundInvoice){
	      if (err) return cb(err);
	      if (foundInvoice.lastStripeEvent >= invoice.lastStripeEvent) return cb(null, foundInvoice);
	      Invoice.update(foundInvoice.id, invoice)
	      .exec(function(err, updatedInvoices){
	      	if (err) return cb(err);
	      	if (!updatedInvoices) return cb(null, null);
	      	Invoice.afterStripeInvoicePaymentFailed(updatedInvoices[0], function(err, invoice){
	      		cb(err, invoice);
	      	});
	      });
	    });
	},

	afterStripeInvoicePaymentFailed: function(invoice, next){
		//Do somethings after an invoice payment succeeded
		next(null, invoice);
	}

}
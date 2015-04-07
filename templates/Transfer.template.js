/**
 * Stripe Transfer Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#transfers
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"tr_xxxxxxxxxxxx"
			primaryKey: true,
    		unique: true
		},
		object: {
			type: 'string' //"transfer"
		},
		created: {
			type: 'datetime' //1393986746
		},
		date: {
			type: 'datetime' //1393986746
		},
		livemode: {
			type: 'boolean'//false
		},
		amount: {
			type: 'integer'//90800
		},
		currency: {
			type: 'string' //"usd"
		},
		reversed: {
			type: 'boolean'//false
		},
		status: {
			type: 'string' //"paid"
		},
		type: {
			type: 'string' //"bank_account"
		},
		reversals: {
			type: 'json' //{"object": "list","total_count": 0,"has_more": false,"url": "/v1/transfers/tr_3biGAn1hq8iKfo/reversals","data": []},
		},
		balance_transaction: {
			type: 'string' //"txn_2v2VcOoVgfuxzP"
		},
		bank_account: {
	  		type: 'json' //{"object": "bank_account","id": "ba_0LK9sazX8tPl54","last4": "3532","country": "US","currency": "usd","status": "new","fingerprint": "AMyAAyMWZEg1LDfU","routing_number": "322271627","bank_name": "J.P. MORGAN CHASE BANK, N.A.","default_for_currency": true},
		},
		destination: {
			type: 'string' //"ba_0LK9sazX8tPl54"
		},
		description: {
			type: 'string' //"STRIPE TRANSFER"
		},
		failure_message: {
			type:'string' //null
		},
		failure_code: {
			type:'string' //null
		},
		amount_reversed: {
			type: 'integer'//0
		},
		metadata: {
			type: 'json' //{}
		},
		statement_descriptor: {
			type:'string' //null
		},
		recipient: {
			type:'string' //null
		},
		source_transaction: {
			type:'string' //null
		},
		application_fee: {
			type:'string' //null
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
		if(values.date){
			values.date = new Date(values.date * 1000);
		}
		cb();
	},

	// Stripe Webhook transfer.created
	stripeTransferCreated: function (transfer, cb) {

		Transfer.findOrCreate(transfer.id, transfer)
	    .exec(function (err, foundTransfer){
	      if (err) return cb(err);
	      if (foundTransfer.lastStripeEvent > transfer.lastStripeEvent) return cb(null, foundTransfer);
	      if (foundTransfer.lastStripeEvent == transfer.lastStripeEvent) return Transfer.afterStripeTransferCreated(foundTransfer, function(err, transfer){ return cb(err, transfer)});
	      Transfer.update(foundTransfer.id, transfer)
	      .exec(function(err, updatedTransfers){
	      	if (err) return cb(err);
	      	if(!updatedTransfers) return cb(null, null);
	      	Transfer.afterStripeTransferCreated(updatedTransfers[0], function(err, transfer){
	      		cb(err, transfer);
	      	});
	      });
	    });
	},

	afterStripeTransferCreated: function(transfer, next){
		//Do something after a transfer is created
		next(null, transfer);
	},

	// Stripe Webhook transfer.updated
	stripeTransferUpdated: function (transfer, cb) {

		Transfer.findOrCreate(transfer.id, transfer)
	    .exec(function (err, foundTransfer){
	      if (err) return cb(err);
	      if (foundTransfer.lastStripeEvent > transfer.lastStripeEvent) return cb(null, foundTransfer);
	      if (foundTransfer.lastStripeEvent == transfer.lastStripeEvent) return Transfer.afterStripeTransferUpdated(foundTransfer, function(err, transfer){ return cb(err, transfer)});
	      Transfer.update(foundTransfer.id, transfer)
	      .exec(function(err, updatedTransfers){
	      	if (err) return cb(err);
	      	if(!updatedTransfers) return cb(null, null);
	      	Transfer.afterStripeTransferUpdated(updatedTransfers[0], function(err,transfer){
	      		cb(err, updatedTransfer);
	      	});
	      });
	    });
	},

	afterStripeTransferUpdated: function(transfer, next){
		//Do something after a transfer is updated
		next(null, transfer);
	},

	// Stripe Webhook transfer.reversed
	stripeTransferReversed: function (transfer, cb) {

		Transfer.findOrCreate(transfer.id, transfer)
	    .exec(function (err, foundTransfer){
	      if (err) return cb(err);
	      if (foundTransfer.lastStripeEvent > transfer.lastStripeEvent) return cb(null, foundTransfer);
	      if (foundTransfer.lastStripeEvent == transfer.lastStripeEvent) return Transfer.afterStripeTransferReversed(foundTransfer, function(err, transfer){ return cb(err, transfer)});
	      Transfer.update(foundTransfer.id, transfer)
	      .exec(function(err, updatedTransfers){
	      	if (err) return cb(err);
	      	if (!updatedTransfers) return cb(null, null);
	      	Transfer.afterStripeTransferReversed(updatedTransfers[0], function(err, transfer){
	      		cb(err, transfer);
	      	});
	      });
	    });
	},

	afterStripeTransferReversed: function(transfer, next){
		//Do something after a transfer is reversed
		next(null, transfer);
	},

	// Stripe Webhook transfer.paid
	stripeTransferPaid: function (transfer, cb) {

		Transfer.findOrCreate(transfer.id, transfer)
	    .exec(function (err, foundTransfer){
	      if (err) return cb(err);
	      if (foundTransfer.lastStripeEvent > transfer.lastStripeEvent) return cb(null, foundTransfer);
	      if (foundTransfer.lastStripeEvent == transfer.lastStripeEvent) return Transfer.afterStripeTransferPaid(foundTransfer, function(err, transfer){ return cb(err, transfer)});
	      Transfer.update(foundTransfer.id, transfer)
	      .exec(function(err, updatedTransfers){
	      	if (err) return cb(err);
	      	if (!updatedTransfers) return cb(null, null);
	      	Transfer.afterStripeTransferPaid(updatedTransfers[0], function(err, transfer){
	      		cb(err, transfer);
	      	});
	      });
	    });
	},

	afterStripeTransferPaid: function(transfer, next){
		//Do something after a transfer is paid
		next(null, transfer);
	},

	// Stripe Webhook transfer.failed
	stripeTransferFailed: function (transfer, cb) {

		Transfer.findOrCreate(transfer.id, transfer)
	    .exec(function (err, foundTransfer){
	      if (err) return cb(err);
	      if (foundTransfer.lastStripeEvent > transfer.lastStripeEvent) return cb(null, foundTransfer);
	      if (foundTransfer.lastStripeEvent == transfer.lastStripeEvent) return Transfer.afterStripeTransferFailed(foundTransfer, function(err, transfer){ return cb(err, transfer)});
	      Transfer.update(foundTransfer.id, transfer)
	      .exec(function(err, updatedTransfers){
	      	if (err) return cb(err);
	      	if (!updatedTransfers) return cb(null, null);
	      	Transfer.afterStripeTransferFailed(updatedTransfers[0], function(err, transfer){
	      		cb(err, transfer);
	      	});
	      });
	    });
	},

	afterStripeTransferFailed: function(transfer, next){
		//Do something after a transfer is paid
		next(null, transfer);
	}

}
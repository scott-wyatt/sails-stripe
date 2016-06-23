/**
 * Stripe Bitcoin Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#bitcoin_receivers
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
			type: 'string', //"btcrcv_5zu4MpDCIGkHcC",
			primaryKey: true,
			unique: true
		},
		object: {
			type: 'string' //"bitcoin_receiver"
		},
		created: {
			type: 'datetime' //1428165432
		},
		livemode: {
			type: 'boolean' //false
		},
		active: {
			type: 'boolean' //false
		},
		amount: {
			type: 'integer' //100
		},
		amount_received: {
			type: 'integer' //0
		},
		bitcoin_amount: {
			type: 'integer' //1428165432
		},
		bitcoin_amount_received: {
			type: 'integer' //0
		},
		bitcoin_uri: {
			type: 'string' //"bitcoin:test_7i9Fo4b5wXcUAuoVBFrc7nc9HDxD1?amount=0.01757908"
		},
		currency: {
			type: 'string' //"usd"
		},
		filled: {
			type: 'boolean' //false
		},
		inbound_address: {
			type: 'string' //"test_7i9Fo4b5wXcUAuoVBFrc7nc9HDxD1"
		},
		uncaptured_funds: {
			type: 'boolean' //false
		},
		description: {
			type: 'string' //"Receiver for John Doe"
		},
		email: {
			type: 'email' // "test@example.com"
		},
		metadata: {
			type: 'json' //{}
		},
		refund_address: {
			type: 'boolean' //false
		},
		transactions: {
			type: 'json'
		},
		payment: {
			type: 'string' //null
		},
		customer: {
			model: 'Customer'
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

	// Stripe Webhook bitcoin.receiver.created
	stripeBitcoinReceiverCreated: function (bitcoin, cb) {

		Bitcoin.findOrCreate(bitcoin.id, bitcoin)
	    .exec(function (err, foundBitcoin){
	      if (err) return cb(err);
	      if (foundBitcoin.lastStripeEvent > bitcoin.lastStripeEvent) return cb(null, foundBitcoin);
	      if (foundBitcoin.lastStripeEvent == bitcoin.lastStripeEvent) return Bitcoin.afterStripeBitcoinReceiverCreated(foundBitcoin, function(err, bitcoin){ return cb(err, bitcoin)});
	      Bitcoin.update(foundBitcoin.id, bitcoin)
	      .exec(function(err, updatedBitcoins){
	      	if (err) return cb(err);
	      	if (!updatedBitcoins) return cb(null, null);
	      	Bitcoin.afterStripeBitcoinReceiverCreated(updatedBitcoins[0], function(err, bitcoin){
	      		cb(err, bitcoin);
	      	});
	      });
	    });
	},

	afterStripeBitcoinReceiverCreated: function (bitcoin, next) {
		//Add somethings to do after a bitcoin receiver is created
		next(null, bitcoin);
	},

	// Stripe Webhook bitcoin.receiver.updated
	stripeBitcoinReceiverUpdated: function (bitcoin, cb) {

		Bitcoin.findOrCreate(bitcoin.id, bitcoin)
	    .exec(function (err, foundBitcoin){
	      if (err) return cb(err);
	      if (foundBitcoin.lastStripeEvent > bitcoin.lastStripeEvent) return cb(null, foundBitcoin);
	      if (foundBitcoin.lastStripeEvent == bitcoin.lastStripeEvent) return Bitcoin.afterStripeBitcoinReceiverUpdated(foundBitcoin, function(err, bitcoin){ return cb(err, bitcoin)});
	      Bitcoin.update(foundBitcoin.id, bitcoin)
	      .exec(function(err, updatedBitcoins){
	      	if (err) return cb(err);
	      	if (!updatedBitcoins) return cb(null, null);
	      	Bitcoin.afterStripeBitcoinReceiverUpdated(updatedBitcoins[0], function(err, bitcoin){
	      		cb(err, bitcoin);
	      	});
	      });
	    });
	},

	afterStripeBitcoinReceiverUpdated: function (bitcoin, next) {
		//Add somethings to do after a bitcoin receiver is created
		next(null, bitcoin);
	},

	// Stripe Webhook bitcoin.receiver.filled
	stripeBitcoinReceiverFilled: function (bitcoin, cb) {

		Bitcoin.findOrCreate(bitcoin.id, bitcoin)
	    .exec(function (err, foundBitcoin){
	      if (err) return cb(err);
	      if (foundBitcoin.lastStripeEvent > bitcoin.lastStripeEvent) return cb(null, foundBitcoin);
	      if (foundBitcoin.lastStripeEvent == bitcoin.lastStripeEvent) return Bitcoin.afterStripeBitcoinReceiverFilled(foundBitcoin, function(err, bitcoin){ return cb(err, bitcoin)});
	      Bitcoin.update(foundBitcoin.id, bitcoin)
	      .exec(function(err, updatedBitcoins){
	      	if (err) return cb(err);
	      	if (!updatedBitcoins) return cb(null, null);
	      	Bitcoin.afterStripeBitcoinReceiverFilled(updatedBitcoins[0], function(err, bitcoin){
	      		cb(err, bitcoin);
	      	});
	      });
	    });
	},

	afterStripeBitcoinReceiverFilled: function (bitcoin, next) {
		//Add somethings to do after a bitcoin receiver is created
		next(null, bitcoin);
	},

	// Stripe Webhook bitcoin.receiver.transaction.created
	stripeBitcoinReceiverTransactionCreated: function (bitcoin, cb) {

		Bitcoin.findOrCreate(bitcoin.id, bitcoin)
	    .exec(function (err, foundBitcoin){
	      if (err) return cb(err);
	      if (foundBitcoin.lastStripeEvent > bitcoin.lastStripeEvent) return cb(null, foundBitcoin);
	      if (foundBitcoin.lastStripeEvent == bitcoin.lastStripeEvent) return Bitcoin.afterStripeBitcoinReceiverTransactionCreated(foundBitcoin, function(err, bitcoin){ return cb(err, bitcoin)});
	      Bitcoin.update(foundBitcoin.id, bitcoin)
	      .exec(function(err, updatedBitcoins){
	      	if (err) return cb(err);
	      	if (!updatedBitcoins) return cb(null, null);
	      	Bitcoin.afterStripeBitcoinReceiverTransactionCreated(updatedBitcoins[0], function(err, bitcoin){
	      		cb(err, bitcoin);
	      	});
	      });
	    });
	},

	afterStripeBitcoinReceiverTransactionCreated: function (bitcoin, next) {
		//Add somethings to do after a bitcoin transaction is created
		next(null, bitcoin);
	},
}
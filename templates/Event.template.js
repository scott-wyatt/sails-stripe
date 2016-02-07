/**
 * Stripe Event Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#events
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"evt_5zfGsQQRVg9T9N",
			primaryKey: true,
    		unique: true
		},
		created: {
			type: 'datetime' //1428110317
		},
		livemode: {
			type: 'boolean' //false
		},
		type: {
			type: 'string' //"invoice.payment_succeeded"
		},
		data: {
		  type: 'json'
		},
		object: {
			type: 'string' //"event"
		},
		pending_webhooks: {
			type: 'string' //0
		},
		request: {
			type: 'string' //null
		},
		api_version: {
			type: 'string' //"2012-07-09"
		}
	},

	beforeValidate: function (values, cb){
		if(values.created){
			values.created = new Date(values.created * 1000);
		}
		if(values.id){
			var err = new Error();
		    err.message = require('util').format('An Event ID is required', values);
		    err.status = 403;
			return cb(err);
		}
		cb();
	},
	beforeCreate: function(values, cb){
		stripe.events.retrieve(values.id, function(err, event) {
        	if (err) {
        		return cb(err);
        	}
        	cb();
    	});
	},

	getStripeEvent: function(type, stripeObject, cb) {
		
		var _fn, _stripeEvents;

		_stripeEvents = {
			
			//Account
			'account.updated': function(){
				Stripeaccount.stripeAccountUpdated(stripeObject, function (err, account) {
					return cb(err, account);
				});
			},
			'account.external_account.created': function(){
				//TODO: No way to currently handle this event
				return cb(null, null);
			},
			'account.external_account.updated': function(){
				//TODO: No way to currently handle this event
				return cb(null, null);
			},
			'account.external_account.deleted': function(){
				//TODO: No way to currently handle this event
				return cb(null, null);
			},
			'account.application.deauthorized': function(){
				Stripeaccount.stripeAccountApplicationDeauthorized(stripeObject, function (err, application) {
					return cb(err, application);
				});
			},

			//Application Fee
			'application_fee.created': function(){
				Applicationfee.stripeApplicationFeeCreated(stripeObject, function (err, fee) {
					return cb(err, fee);
				});
			},
			'application_fee.refunded': function(){
				Applicationfee.stripeApplicationFeeRefunded(stripeObject, function (err, fee) {
					return cb(err, fee);	
				});
			},

			//Balance
			'balance.available': function () {
				//Balance Objects have no Id.
				return cb(null, null);
			},

			//Bitcoin
			'bitcoin.receiver.created': function () {
				Bitcoin.stripeBitcoinReceiverCreated(stripeObject, function (err, receiver) {
					return cb(err, receiver);
				});
			},
			'bitcoin.receiver.filled': function () {
				Bitcoin.stripeBitcoinReceiverFilled(stripeObject, function (err, receiver) {
					return cb(err, receiver);
				});
			},
			'bitcoin.receiver.updated': function () {
				Bitcoin.stripeBitcoinReceiverUpdated(stripeObject, function (err, receiver) {
					return cb(err, receiver);
				});
			},
			'bitcoin.receiver.transaction.created': function () {
				Bitcoin.stripeBitcoinReceiverTransactionCreated(stripeObject, function (err, receiver) {
					return cb(err, receiver);
				});
			},

			//Charge
			'charge.succeeded': function(){
				Charge.stripeChargeSucceeded(stripeObject, function (err, charge) {
					return cb(err, charge);
				});
			},
			'charge.failed': function(){
				Charge.stripeChargeFailed(stripeObject, function (err, charge) {
					return cb(err, charge);
				});
			},
			'charge.refunded': function(){
				Charge.stripeChargeRefunded(stripeObject, function (err, charge) {
					return cb(err, charge);
				});
			},
			'charge.captured': function(){
				Charge.stripeChargeCaptured(stripeObject, function (err, charge) {
					return cb(err, charge);
				});
			},
			'charge.updated': function(){
				Charge.stripeChargeUpdated(stripeObject, function (err, charge) {
					return cb(err, charge);
				});
			},
			'charge.dispute.created': function(){
				Dispute.stripeChargeDisputeCreated(stripeObject, function (err, dispute) {
					return cb(err, dispute);	
				});
			},
			'charge.dispute.updated': function(){
				Dispute.stripeChargeDisputeUpdated(stripeObject, function (err, dispute) {
					return cb(err, dispute);	
				});
			},
			'charge.dispute.closed': function(){
				Dispute.stripeChargeDisputeClosed(stripeObject, function (err, dispute) {
					return cb(err, dispute);
				});
			},
			'charge.dispute.funds_withdrawn': function(){
				Dispute.stripeChargeDisputeFundsWithdrawn(stripeObject, function (err, dispute) {
					return cb(err, dispute);
				});
			},
			'charge.dispute.funds_reinstated': function(){
				Dispute.stripeChargeDisputeFundsReinstated(stripeObject, function (err, dispute) {
					return cb(err, dispute);	
				});
			},

			//Coupon
			'coupon.created': function(){
				Coupon.stripeCouponCreated(stripeObject, function (err, coupon) {
					return cb(err, coupon);
				});
			},
			'coupon.deleted': function(){
				Coupon.stripeCouponDeleted(stripeObject, function (err, coupon) {
					return cb(err, coupon);
				});
			},

			//Customer
			'customer.created': function(){
				Customer.stripeCustomerCreated(stripeObject, function (err, customer) {
					return cb(err, customer);	
				});
			},
			'customer.updated': function(){
				Customer.stripeCustomerUpdated(stripeObject, function (err, customer) {
					return cb(err, customer);	
				});
			},
			'customer.deleted': function(){
				Customer.stripeCustomerDeleted(stripeObject, function (err, customer) {
					return cb(err, customer);	
				});
			},
			'customer.card.created': function(){
				Card.stripeCustomerCardCreated(stripeObject, function (err, card) {
					return cb(err, card);	
				});
			},
			'customer.card.updated': function(){
				Card.stripeCustomerCardUpdated(stripeObject, function (err, card) {
					return cb(err, card);	
				});
			},
			'customer.card.deleted': function(){
				Card.stripeCustomerCardDeleted(stripeObject, function (err, card) {
					return cb(err, card);	
				});
			},
			'customer.source.created': function(){
				var _sourceTypes, _sourceType;
				_sourceTypes = {
					'card' : Card.stripeCustomerCardCreated,
					'bitcoin_receiver' : Bitcoin.stripeBitcoinReceiverCreated,
					'bank_account' : Bankaccount.stripeCustomerSourceCreated
				};
				_sourceType = _sourceTypes[stripeObject.object];
				if(typeof _sourceType  !== 'function'){
					var err = new Error();
			    	err.message = 'customer.source.created','can not handle',stripeObject.object;
			    	err.status = 500;
					return cb(err, stripeObject);
				}else{
					_sourceType(stripeObject, function (err, source) {
						return cb(err, source);	
					});
				}
			},
			'customer.source.updated': function(){
				var _sourceTypes, _sourceType;
				_sourceTypes = {
					'card' : Card.stripeCustomerCardUpdated,
					'bitcoin_receiver' : Bitcoin.stripeBitcoinReceiverUpdated,
					'bank_account' : Bankaccount.stripeCustomerSourceUpdated
				};
				_sourceType = _sourceTypes[stripeObject.object];
				if(typeof _sourceType  !== 'function'){
					var err = new Error();
			    	err.message = 'customer.source.updated','can not handle',stripeObject.object;
			    	err.status = 500;
					return cb(err, stripeObject);
				}else{
					_sourceType(stripeObject, function (err, source) {
						return cb(err, source);	
					});
				}
			},
			'customer.source.deleted': function(){
				var _sourceTypes, _sourceType;
				_sourceTypes = {
					'card' : Card.stripeCustomerCardDeleted,
					'bitcoin_receiver' : Bitcoin.stripeBitcoinReceiverDeleted,
					'bank_account' : Bankaccount.stripeCustomerSourceDeleted
				};
				_sourceType = _sourceTypes[stripeObject.object];
				if(typeof _sourceType  !== 'function'){
					var err = new Error();
			    	err.message = 'customer.source.deleted','can not handle',stripeObject.object;
			    	err.status = 500;
					return cb(err, stripeObject);
				}else{
					_sourceType(stripeObject, function (err, source) {
						return cb(err, source);	
					});
				}
			},
			'customer.subscription.created': function(){
				Subscription.stripeCustomerSubscriptionCreated(stripeObject, function (err, subscription) {
					return cb(err, subscription);	
				});
			},
			'customer.subscription.updated': function(){
				Subscription.stripeCustomerSubscriptionUpdated(stripeObject, function (err, subscription) {
					return cb(err, subscription);
				});
			},
			'customer.subscription.deleted': function(){
				Subscription.stripeCustomerSubscriptionDeleted(stripeObject, function (err, subscription) {
					return cb(err, subscription);	
				});
			},
			'customer.subscription.trial_will_end': function(){
				Subscription.stripeCustomerSubscriptionTrial(stripeObject, function (err, subscription) {
				return cb(err, subscription);	
				});
			},
			'customer.discount.created': function(){
				Discount.stripeCustomerDiscountCreated(stripeObject, function (err, discount) {
					return cb(err, discount);	
				});
			},
			'customer.discount.updated': function(){
				Discount.stripeCustomerDiscountUpdated(stripeObject, function (err, discount) {
					return cb(err, discount);	
				});
			},
			'customer.discount.deleted': function(){
				Discount.stripeCustomerDiscountDeleted(stripeObject, function (err, discount) {
					return cb(err, discount);	
				});
			},

			//Invoice
			'invoice.created': function(){
				Invoice.stripeInvoiceCreated(stripeObject, function (err, invoice) {
					return cb(err, invoice);	
				});
			},
			'invoice.updated': function(){
				Invoice.stripeInvoiceUpdated(stripeObject, function (err, invoice) {
					return cb(err, invoice);
				});
			},
			'invoice.payment_succeeded': function(){
				Invoice.stripeInvoicePaymentSucceeded(stripeObject, function (err, invoice) {
					return cb(err, invoice);
				});
			},
			'invoice.payment_failed': function(){
				Invoice.stripeInvoicePaymentFailed(stripeObject, function (err, invoice) {
					return cb(err, invoice);
				});
			},

			//Invoice Item
			'invoiceitem.created': function(){ 
				Invoiceitem.stripeInvoiceitemCreated(stripeObject, function (err, invoiceitem) {
					return cb(err, invoiceitem);
				});
			},
			'invoiceitem.updated': function(){
				Invoiceitem.stripeInvoiceitemUpdated(stripeObject, function (err, invoiceitem) {
					return cb(err, invoiceitem);
				});
			},
			'invoiceitem.deleted': function(){
				Invoiceitem.stripeInvoiceitemDeleted(stripeObject, function (err, invoiceitem) {
					return cb(err, invoiceitem);	
				});
			},

			//Order
			'order.created': function(){
				Order.stripeOrderCreated(stripeObject, function (err, order) {
					return cb(err, order);
				});
			},
			'order.payment_failed': function(){
				Order.stripeOrderPaymentFailed(stripeObject, function (err, order) {
					return cb(err, order);
				});
			},
			'order.payment_succeeded': function(){
				Order.stripeOrderPaymentSucceeded(stripeObject, function (err, order) {
					return cb(err, order);
				});
			},
			'order.updated': function(){
				Order.stripeOrderUpdated(stripeObject, function (err, order) {
					return cb(err, order);
				});
			},

			//Plan
			'plan.created': function(){
				Plan.stripePlanCreated(stripeObject, function (err, plan) {
					return cb(err, plan);	
				});
			},
			'plan.updated': function(){
				Plan.stripePlanUpdated(stripeObject, function (err, plan) {
					return cb(err, plan);	
				});
			},
			'plan.deleted': function(){
				Plan.stripePlanDeleted(stripeObject, function (err, plan) {
					return cb(err, plan);	
				});
			},

			//Product
			'product.created': function(){
				Product.stripeProductCreated(stripeObject, function (err, product) {
					return cb(err, product);	
				});
			},
			'product.updated': function(){
				Product.stripeProductUpdated(stripeObject, function (err, product) {
					return cb(err, product);	
				});
			},			

			//Recipient
			'recipient.created': function(){
				Recipient.stripeRecipientCreated(stripeObject, function (err, recipient) {
					return cb(err, recipient);
				});
			},
			'recipient.updated': function(){
				Recipient.stripeRecipientUpdated(stripeObject, function (err, recipient) {
					return cb(err, recipient);
				});
			},
			'recipient.deleted': function(){
				Recipient.stripeRecipientDeleted(stripeObject, function (err, recipient) {
					return cb(err, recipient);
				});
			},

			//Sku
			'sku.created': function(){
				Sku.stripeSkuCreated(stripeObject, function (err, sku) {
					return cb(err, sku);	
				});
			},
			'sku.updated': function(){
				Sku.stripeSkuCreated(stripeObject, function (err, sku) {
					return cb(err, sku);	
				});
			},

			//Transfer
			'transfer.created': function(){
				Transfer.stripeTransferCreated(stripeObject, function (err, transfer) {
					return cb(err, transfer);
				});
			},
			'transfer.updated': function(){
				Transfer.stripeTransferUpdated(stripeObject, function (err, transfer) {
					return cb(err, transfer);
				});
			},
			'transfer.reversed': function(){
				Transfer.stripeTransferReversed(stripeObject, function (err, transfer) {
					return cb(err, transfer);	
				});
			},
			'transfer.paid': function(){
				Transfer.stripeTransferPaid(stripeObject, function (err, transfer) {
					return cb(err, transfer);
				});
			},
			'transfer.failed': function(){
				Transfer.stripeTransferFailed(stripeObject, function (err, transfer) {
					return cb(err, transfer);
				});
			},

			//Bitcoin
			'bitcoin.receiver.created': function(){
				Bitcoin.stripeBitcoinReceiverCreated(stripeObject, function (err, bitcoin) {
					return cb(err, bitcoin);
				});
			},
			'bitcoin.receiver.transaction.created': function(){
				Bitcoin.stripeBitcoinReceiverTransactionCreated(stripeObject, function (err, bitcoin) {
					return cb(err, bitcoin);
				});
			},
			'bitcoin.receiver.filled': function(){
				Bitcoin.stripeBitcoinReceiverFilled(stripeObject, function (err, bitcoin) {
					return cb(err, bitcoin);
				});
			},

			//Ping
			'ping': function () {
				//May be sent by Stripe at any time to see if a provided webhook URL is working. So return a 200
				return cb(null, "OK");
			},
			'default': function () {
				//As of this Generators creation all hooks are handled. So this may be a rouge attempt or you may have experimental features enabled from Stripe.
				sails.log.error("unknown operation...");
				return cb(null, "Unknown Operation");
			}
		};
		// if the _stripeEvents Object contains the type
		// passed in, let's use it
		sails.log("TYPE:",type);

		if (typeof _stripeEvents[type] !== 'undefined') {
			_stripeEvents[type](stripeObject);
		} else {
			// otherwise we'll assign the default
		 	// also the same as _stripeEvents.default
		   _stripeEvents["default"](stripeObject);
		}
	}
}
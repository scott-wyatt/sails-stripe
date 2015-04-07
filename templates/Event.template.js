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
		cb();
	},

	getStripeEvent: function(type, stripeObject, cb) {
		
		var _fn, _stripeEvents;

		_stripeEvents = {
			
			'account.updated': function(){
				Stripeaccount.stripeAccountUpdated(stripeObject, function (err, account) {
					return cb(err, account);
				});
			},
			'account.application.deauthorized': function(){
				Stripeaccount.stripeAccountApplicationDeauthorized(stripeObject, function (err, application) {
					return cb(err, application);
				});
			},
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
			'balance.available': function () {
				//Balance Objects have no Id.
				return cb(null, null);
			},
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
/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');

/**
 * sails-generate-sails-stripe
 *
 * Usage:
 * `sails generate sails-stripe`
 *
 * @description Generates a sails-stripe
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate sailsstripe user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    /*
    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this sails-stripe.') );
    }
    */

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }

    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    // Decide the output filename for use in targets below:
    //scope.filename = scope.args[0];

    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'sails-stripe created at '+scope.createdAt+', it just saved you a ton of time, how about buying @ScottBWyatt a beer?';

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    cb();
  },

  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    
    './api/models/Applicationfee.js': { template: 'Applicationfee.template.js' },
    './api/models/Applicationfeerefund.js': { template: 'Applicationfeerefund.template.js' },
    './api/models/Card.js': { template: 'Card.template.js' },
    './api/models/Customer.js': { template: 'Customer.template.js' },
    './api/models/Charge.js': { template: 'Charge.template.js' },
    './api/models/Coupon.js': { template: 'Coupon.template.js' },
    './api/models/Discount.js': { template: 'Discount.template.js' },
    './api/models/Dispute.js': { template: 'Dispute.template.js' },
    './api/models/Event.js': { template: 'Event.template.js' },
    './api/models/Invoice.js': { template: 'Invoice.template.js' },
    './api/models/Invoiceitem.js': { template: 'Invoiceitem.template.js' },
    './api/models/Plan.js': { template: 'Plan.template.js' },
    './api/models/Recipient.js': { template: 'Recipient.template.js' },
    './api/models/Refund.js': { template: 'Refund.template.js' },
    './api/models/Subscription.js': { template: 'Subscription.template.js' },
    './api/models/Transfer.js': { template: 'Transfer.template.js' },
    './api/models/Transferreversal.js': { template: 'Transferreversal.template.js' },
    './api/models/Bitcoin.js': { template: 'Bitcoin.template.js' },
    './api/models/Stripeaccount.js': { template: 'Stripeaccount.template.js' },
    './api/models/Bankaccount.js': { template: 'Bankaccount.template.js' },
    './api/models/Product.js': { template: 'Product.template.js' },
    './api/models/Sku.js': { template: 'Sku.template.js' },
    './api/models/Order.js': { template: 'Order.template.js' },
    './api/models/Orderitem.js': { template: 'Orderitem.template.js' },
    './api/models/Token.js': { template: 'Token.template.js' },
    './api/models/Alipayaccount.js': { template: 'Alipayaccount.template.js' },

    './api/controllers/ApplicationfeeController.js': { template: 'ApplicationfeeController.template.js' },
    './api/controllers/ApplicationfeerefundController.js': { template: 'ApplicationfeerefundController.template.js' },
    './api/controllers/CardController.js': { template: 'CardController.template.js' },
    './api/controllers/CustomerController.js': { template: 'CustomerController.template.js' },
    './api/controllers/ChargeController.js': { template: 'ChargeController.template.js' },
    './api/controllers/CouponController.js': { template: 'CouponController.template.js' },
    './api/controllers/DiscountController.js': { template: 'DiscountController.template.js' },
    './api/controllers/DisputeController.js': { template: 'DisputeController.template.js' },
    './api/controllers/EventController.js': { template: 'EventController.template.js' },
    './api/controllers/InvoiceController.js': { template: 'InvoiceController.template.js' },
    './api/controllers/InvoiceitemController.js': { template: 'InvoiceitemController.template.js' },
    './api/controllers/PlanController.js': { template: 'PlanController.template.js' },
    './api/controllers/RecipientController.js': { template: 'RecipientController.template.js' },
    './api/controllers/RefundController.js': { template: 'RefundController.template.js' },
    './api/controllers/SubscriptionController.js': { template: 'SubscriptionController.template.js' },
    './api/controllers/TransferController.js': { template: 'TransferController.template.js' },
    './api/controllers/TransferreversalController.js': { template: 'TransferreversalController.template.js' },
    './api/controllers/BitcoinController.js': { template: 'BitcoinController.template.js' },
    './api/controllers/StripeaccountController.js': { template: 'StripeaccountController.template.js' },
    './api/controllers/BankaccountController.js': { template: 'BankaccountController.template.js' },
    './api/controllers/ProductController.js': { template: 'ProductController.template.js' },
    './api/controllers/SkuController.js': { template: 'SkuController.template.js' },
    './api/controllers/OrderController.js': { template: 'OrderController.template.js' },
    './api/controllers/OrderitemController.js': { template: 'OrderitemController.template.js' },
    './api/controllers/TokenController.js': { template: 'TokenController.template.js' },
    './api/controllers/AlipayaccountController.js': { template: 'AlipayaccountController.template.js' },

    './api/controllers/StripeController.js': { template: 'StripeController.template.js' },

  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};

/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "sails-stripe":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-sails-stripe`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}

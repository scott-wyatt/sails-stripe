/**
 * Stripe SKUs Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#skus
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		id: {
	  		type: 'string', //"sku_74DEICYJxo7XQF"
			primaryKey: true,
    		unique: true
		},
		created: {
			type: 'datetime' //1443458925
		},
		updated: { 
			type: 'datetime' //1443458925
		},
		object: {
			type: 'string' //"sku"
		},
		livemode: {
			type: 'boolean' //false
		},
		product: {
			model: 'Product' //"prod_74DESReKhddEzB"
		},
		image: {
			type: 'text' //null
		},
		active: {
			type: 'boolean' //true
		},
		price: { 
			type: 'integer' //1500
		},
		currency: {
			type: 'string' //"usd"
		},
		inventory: {
			type: 'json' // {type: "finite", quantity: 50, value: null} 
		},
		attributes: {
			type: 'json'
		},
		metadata: {
			type: 'json'
		},
		package_dimensions: {
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
		if(values.updated){
			values.updated = new Date(values.updated * 1000);
		}
		cb();
	},

	// Stripe Webhook sku.created
	stripeSkuCreated: function (sku, cb) {

		Sku.findOrCreate(sku.id, sku)
	    .exec(function (err, foundSku){
	      if (err) return cb(err);
	      if (foundSku.lastStripeEvent > sku.lastStripeEvent) return cb(null, foundSku);
	      if (foundSku.lastStripeEvent == sku.lastStripeEvent) return Sku.afterStripeSkuCreated(foundSku, function(err, sku){ return cb(err, sku)});
	      Sku.update(foundSku.id, sku)
	      .exec(function(err, updatedSku){
	      	if (err) return cb(err);
	      	if (!updatedSku) return cb(null,null);
	      	Sku.afterStripeSkuCreated(updatedSku[0], function(err, sku){
	      		cb(err, sku);
	      	});
	      });
	    });
	},

	afterStripeSkuCreated: function(sku, next){
		//Do somethings after an invoice item is created
		next(null, sku);
	},

	// Stripe Webhook sku.updated
	stripeSkuUpdated: function (sku, cb) {

		Sku.findOrCreate(sku.id, sku)
	    .exec(function (err, foundSku){
	      if (err) return cb(err);
	      if (foundSku.lastStripeEvent > sku.lastStripeEvent) return cb(null, foundSku);
	      if (foundSku.lastStripeEvent == sku.lastStripeEvent) return Sku.afterStripeSkuUpdated(foundSku, function(err, sku){ return cb(err, sku)});
	      Sku.update(foundSku.id, sku)
	      .exec(function(err, updatedSku){
	      	if (err) return cb(err);
	      	if (!updatedSku) return cb(null,null);
	      	Sku.afterStripeSkuUpdated(updatedSku[0], function(err, sku){
	      		cb(err, sku);
	      	});
	      });
	    });
	},

	afterStripeSkuUpdated: function(sku, next){
		//Do somethings after an invoice item is created
		next(null, sku);
	},
}
/**
 * Stripe Product Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#products
 */

module.exports = {
	
	autoPK: false,
	
	attributes: {
		id: {
	  		type: 'string', //"ba_16q4nxBw8aZ7QiYmwqM3lvdR"
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
			type: 'string' //"product"
		},
		livemode: {
			type: 'boolean' //false
		},
		name: {
			type: 'string'
		},
		caption: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		active: {
			type: 'boolean'
		},
		attributes: {
			type: 'array'
		},
		shippable: {
			type: 'boolean'
		},
		metadata: {
			type: 'json'
		},
		url: {
			type: 'string'
		},
		package_dimensions: {
			type: 'json'
		},
		images: {
			type: 'array'
		},
		skus: {
			type: 'json' //"object": "list","total_count": 0,"has_more": false,"url": "/v1/skus?product=prod_74DESReKhddEzB\u0026active=true","data": []
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

	// Stripe Webhook product.created
	stripeProductCreated: function (product, cb) {

		Product.findOrCreate(product.id, product)
	    .exec(function (err, foundProduct){
	      if (err) return cb(err);
	      if (foundProduct.lastStripeEvent > product.lastStripeEvent) return cb(null, foundProduct);
	      if (foundProduct.lastStripeEvent == product.lastStripeEvent) return Product.afterStripeProductCreated(foundProduct, function(err, product){ return cb(err, product)});
	      Product.update(foundProduct.id, product)
	      .exec(function(err, updatedProduct){
	      	if (err) return cb(err);
	      	if (!updatedProduct) return cb(null,null);
	      	Product.afterStripeProductCreated(updatedProduct[0], function(err, product){
	      		cb(err, product);
	      	});
	      });
	    });
	},

	afterStripeProductCreated: function(product, next){
		//Do somethings after an invoice item is created
		next(null, product);
	},

	// Stripe Webhook product.updated
	stripeProductUpdated: function (product, cb) {

		Product.findOrCreate(product.id, product)
	    .exec(function (err, foundProduct){
	      if (err) return cb(err);
	      if (foundProduct.lastStripeEvent > product.lastStripeEvent) return cb(null, foundProduct);
	      if (foundProduct.lastStripeEvent == product.lastStripeEvent) return Product.afterStripeProductUpdated(foundProduct, function(err, product){ return cb(err, product)});
	      Product.update(foundProduct.id, product)
	      .exec(function(err, updatedProduct){
	      	if (err) return cb(err);
	      	if (!updatedProduct) return cb(null,null);
	      	Product.afterStripeProductUpdated(updatedProduct[0], function(err, product){
	      		cb(err, product);
	      	});
	      });
	    });
	},

	afterStripeProductUpdated: function(product, next){
		//Do somethings after an invoice item is created
		next(null, product);
	},
}
/**
 * Stripe Coupon Model
 *
 * <%= whatIsThis %>.
 * 
 * Refer to Stripe Documentation https://stripe.com/docs/api#coupons
 */

module.exports = {
	
	autoPK: false,
	attributes: {
		id: {
	  		type: 'string', //"Trial"
			primaryKey: true,
    		unique: true
		},
		created: {
			type: 'datetime' //1390771427
		},
		percent_off: {
			type: 'integer' //10
		},
		amount_off: {
			type: 'integer' //10
		},
		currency: {
			type: 'string' ///"usd"
		},
		object: {
			type: 'string' //"coupon"
		},
		livemode: {
			type: 'boolean' //false
		},
		duration: {
			type: 'string' //"once"
		},
		redeem_by: {
			type: 'datetime' //1390771427
		},
		max_redemptions:  {
			type: 'integer' //null
		},
		times_redeemed:  {
			type: 'integer' //1
		},
		duration_in_months:  {
			type: 'integer' //null
		},
		valid: {
			type: 'boolean' //true
		},
		metadata: {
			type: 'json' //{}
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
		if(values.redeem_by){
			values.redeem_by = new Date(values.redeem_by * 1000);
		}
		cb();
	},

	// Stripe Webhook coupon.created
	stripeCouponCreated: function (coupon, cb) {

		Coupon.findOrCreate(coupon.id, coupon)
	    .exec(function (err, foundCoupon){
	      if (err) return cb(err);
	      if (foundCoupon.lastStripeEvent > coupon.lastStripeEvent) return cb(null, foundCoupon);
	      if (foundCoupon.lastStripeEvent == coupon.lastStripeEvent) return Coupon.afterStripeCouponCreated(foundCoupon, function(err, coupon){ return cb(err, coupon)});
	      Coupon.update(foundCoupon.id, coupon)
	      .exec(function(err, updatedCoupons){
	      	if (err) return cb(err);
	      	Coupon.afterStripeCouponCreated(updatedCoupons[0], function(err, coupon){
	      		cb(err, coupon);
	      	});
	      });
	    });
	},

	afterStripeCouponCreated: function(coupon, next){
		//Add somethings to do after a coupon is created
		next(null, coupon);
	},

	// Stripe Webhook coupon.deleted
	stripeCouponDeleted: function (coupon, cb) {

		Coupon.destroy(coupon.id)
	    .exec(function (err, destroyedCoupons){
	      if (err) return cb(err);
	      if(!destroyedCoupons) return cb(null, null);
	      Coupon.afterStripeCouponDeleted(destroyedCoupons[0], function(err, coupon){
	      	cb(null, coupon);
	      });
	    });
	},

	afterStripeCouponDeleted: function(coupon, next){
		//Add somethings to do after a coupon is deleted
		next(null, coupon);
	},
}
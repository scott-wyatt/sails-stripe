/**
 * StripeController
 *
 * <%= whatIsThis %>.
 *
 * @description :: Controller for Stripe Models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {

 	webhook: function(req, res){
		
		var params = req.params.all();
		console.log(params);
		
		var eventDate = new Date(params.created * 1000);
		console.log("EVENT:", eventDate);

		//We add this in incase Stripe Events get out of Order
		params.data.object.lastStripeEvent = eventDate;

		Event.findOrCreate(params.id, params)
		.exec(function(err, stripeEvent){
			if(err) return res.serverError(err);
			if(!stripeEvent){
				err = new Error();
		    	err.message = require('util').format('Could not findOrCreate w/ id=%s.', params.id);
		    	err.status = 500;
		    	return res.serverError(err);
			}

			Event.getStripeEvent(params.type, params.data.object, function(err, response){
				if(err){
					sails.log.error(err);
					return res.serverError(err);
				}else{
					if(!res.headersSent){
						res.ok(response);
					}else{
						sails.log.error("Tried to Send Double Headers...");
					}
				}
			});
		});
	}
 }
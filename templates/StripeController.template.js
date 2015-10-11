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
			
		var eventDate = new Date(params.created * 1000);
		sails.log("EVENT:", eventDate);

		//We add this in incase Stripe Events get out of Order
		params.data.object.lastStripeEvent = eventDate;

		//Check if this event is already in the system
		Event.count(params.id)
		.exec(function(err, count){
			//If err, stripe will need to retry this webhook in 1 hour
			if(err) return res.serverError(err);

			//If in the system, let stripe know it doesn't need to reattempt the webhook
			if(count > 0){
				return res.ok(params);
			}

			//Create the Event in the database
			Event.create(params)
			.exec(function(err, stripeEvent){

				//If there is an error creating the event, stripe will need to try again in 1 hour
				if(err) return res.serverError(err);
				
				//If the created stripe event was not Created, stripe will need to try again in 1 hour
				if(!stripeEvent){
					err = new Error();
			    	err.message = require('util').format('Could not create w/ id=%s.', params.id);
			    	err.status = 500;
			    	return res.serverError(err);
				}

				if(!res.headersSent){
					res.ok(stripeEvent);
				}

				//Perists the rest to the background
				Event.getStripeEvent(params.type, params.data.object, function(err, response){
					if(err){
						sails.log.error(err);
					}else{
						sails.log(response);
					}
				});
			});
		});
	}
 }
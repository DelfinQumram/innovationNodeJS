var Joi = require('joi');

module.exports = {
	check : {
        name: Joi.string().required(),
    	age: Joi.number().integer().required()
	}
}
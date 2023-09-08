const joi = require('joi');

const loginSchema = joi.object({
    // username: joi.string().required(),
    // Password: joi.string().required()

});
module.exports={
    loginSchema
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description create recipient schema with email(String) and responded (Boolen) property
 */
const recipientSchema = new Schema({
    email: String,
    responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;
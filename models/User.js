const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	role: {
		type: String,
		required: true,
		trim: true,
		default: 'user',
		enum: ['admin','user']
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	avatar: {
		type: String,
		trim: true
	},
	street: String,
	city: String,
	zip: String,
	phone: String,
	country: String
}, {
	timestamps: true
})

UserSchema.method('encryptPassword', function( password ){

	const salt = bcrypt.genSaltSync()
	
	this.password = bcrypt.hashSync( password, salt )
})

module.exports = model( 'User', UserSchema )
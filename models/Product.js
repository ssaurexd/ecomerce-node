const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
	name: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		required: true
	},
	inStock: {
		type: Number,
		default: 0
	},
	description: {
		type: String
	},
	image: {
		type: String,
		trim: true
	},
	brand: {
		type: String,
		required: true
	},
	category: {
		type: [String],
		required: true
	},
	rating: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
})

module.exports = model( 'Product', ProductSchema )
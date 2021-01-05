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
	sizes: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'ProductSize',
		populate: { select: 'name inStock' }
	}],
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
		type: Number
	}
})

module.exports = model( 'Product', ProductSchema )
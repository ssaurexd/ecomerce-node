const { Schema, model } = require('mongoose')


const ProductSizeSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ['sm', 'md', 'lg']
	},
	inStock: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
})

module.exports = model( 'ProductSize', ProductSizeSchema )
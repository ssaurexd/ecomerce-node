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
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Pruduct',
		required: true
	}
}, {
	timestamps: true
})

module.exports = model( 'ProductSize', ProductSizeSchema )
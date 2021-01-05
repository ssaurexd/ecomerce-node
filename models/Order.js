const { Schema, model } = require('mongoose')


const OrderSchema = new Schema({
	units: {
		type: Number
	},
	total: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		populate: { select: '-createdAt -updatedAt -password -role -active -avatar' }
	},
	status: {
		type: Boolean,
		default: 'Pendiente',
		enum: ['Pendiente', 'Cancelado', 'Enviado']
	},
	articles: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		populate: { select: 'price sizes name' }
	}]
}, {
	timestamps: true
})

module.exports = model( 'Order', OrderSchema )
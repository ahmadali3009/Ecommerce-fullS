const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartSchema = new Schema({
    quantity: { type : Number, required: true},
    product: { type: Schema.Types.ObjectId, ref: 'product', required: [true , 'product is required']},
    user:{ type: Schema.Types.ObjectId, ref: 'user', required: true}
})

const virtual  = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


let Cart = mongoose.model('cart',cartSchema)

module.exports = Cart;
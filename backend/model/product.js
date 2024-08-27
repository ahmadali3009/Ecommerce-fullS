let { Schema , model} = require("mongoose")
let productSchema = new Schema(
{   title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    brand : {
        type: String,
        required: true,
    },
    price : {type: Number, min:[1 ,"wrong min price"], max:[10000000, "wrong max price"]},
    discountPercentage : {type: String, min:[1 , "wrong min dis"] , max:[99 , "wrong max dis"] },
    stock : {type: String, min:[0 , "worng min stock"]},
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    deleted:{type: Boolean , default:false}
},
{timestamps : true}
)
const virtual = productSchema.virtual('id')

virtual.get(function(){
    return this._id
})
productSchema.set("toJSON" , {
    virtuals : true,
    versionKey : false,
    transform : function(newproduct , ret) {delete ret._id}
})

let product = model("product" , productSchema)

module.exports = product;
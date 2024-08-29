let { Schema , model} = require("mongoose")
let brandSchema = new Schema(
{   value : {
        type: String,
    },
    label : {
        type: String,
    } ,

},
{timestamps : true}
)
// Create a virtual property `id` that maps to `_id`
const virtual = brandSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

// Modify the toJSON output to include the virtual `id` and remove `_id`
brandSchema.set("toJSON", {
  virtuals: true,        // Include virtuals in the JSON output
  versionKey: false,     // Remove `__v` version key from the output
  transform: function (doc, ret) {
    delete ret._id;      // Delete `_id` from the JSON output
  }
});

let brand = model("brand" , brandSchema)

module.exports = brand;
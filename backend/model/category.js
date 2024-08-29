let { Schema , model} = require("mongoose")
let categorySchema = new Schema(
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
const virtual = categorySchema.virtual('id');
virtual.get(function () {
  return this._id;
});

// Modify the toJSON output to include the virtual `id` and remove `_id`
categorySchema.set("toJSON", {
  virtuals: true,        // Include virtuals in the JSON output
  versionKey: false,     // Remove `__v` version key from the output
  transform: function (doc, ret) {
    delete ret._id;      // Delete `_id` from the JSON output
  }
});

let category = model("category" , categorySchema)

module.exports = category;
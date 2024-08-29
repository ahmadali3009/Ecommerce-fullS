let { Schema, model } = require("mongoose");

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,  // Corrected from `require` to `required`
    },
    email: {
      type: String,
      required: true,  // Corrected from `require` to `required`
      unique: true
    },
    password: {
      type: String,
      required: true,  // Corrected from `require` to `required`
    },
    role: {
      type: String,
      default: "user"
    },
    addresses: {
      type: [Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

// Create a virtual property `id` that maps to `_id`
const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

// Modify the toJSON output to include the virtual `id` and remove `_id`
userSchema.set("toJSON", {
  virtuals: true,        // Include virtuals in the JSON output
  versionKey: false,     // Remove `__v` version key from the output
  transform: function (doc, ret) {
    delete ret._id;      // Delete `_id` from the JSON output
  }
});

let user = model("user", userSchema);

module.exports = user;

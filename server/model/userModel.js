const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Name Required!"] },
    email: { type: String, required: [true, "Email Required!"] },
    password: {
      type: String,
      required: [true, "Password Required!"],
      select: false,
    },
    customerId: { type: String },
    subscription: { type: String },
  },
  {
    methods: {
      async matchPassword(enteredPassword) {
        try {
          return await bcrypt.compare(enteredPassword, this.password);
        } catch (error) {
          console.log("Error in matching password", error);
        }
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUNDS) || 10
  );
  next();
});

// userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
//   try {
//     return await bcrypt.compare(enteredPassword, this.password);
//   } catch (error) {
//     console.log("Error in matching password", error);
//   }
// };

userSchema.methods.generateToken = async function generateToken() {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
};

exports.UserModel = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

class User {
  constructor() {
    this.userModel = mongoose.model("User", userSchema);
  }

  findUserByIdAndUpdate(id, updateParams) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: updateParams,
      },
      {
        new: true,
      }
    );
  }

  updateToken(id, newToken) {
    return this.userModel.findByIdAndUpdate(id, {
      token: newToken,
    });
  }
}

export default new User();

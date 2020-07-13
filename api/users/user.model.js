import mongoose, { Schema } from "mongoose";
import Avatar from "avatar-builder";
import fs from "fs";

const avatar = Avatar.squareBuilder(128);

const userSchema = new Schema({
  email: String,
  password: String,
  avatarURL: String,
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

  generateAvatar = async () => {
    let number = Date.now();

    return avatar
      .create(number)
      .then((buffer) => {
        fs.writeFileSync(`./tmp/${number}.png`, buffer);
        return buffer;
      })
      .catch((error) => console.log("Error", error));
  };

  moveAvatarAndReturnAvatarName() {
    const path = "./tmp";
    let avatarName;

    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          avatarName = data[0];
          fs.rename(
            `./tmp/${avatarName}`,
            `./public/images/${avatarName}`,
            (error) => {
              if (error) throw error;
            }
          );
          resolve(avatarName);
        }
      });
    });
  }
}

export default new User();

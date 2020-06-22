import User from "./user.model";

export const getCurrentUser = async (req, res, next) => {
  const foundUser = req.user;

  if (foundUser) {
    return res.status(200).json(foundUser);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.userModel.find();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await User.userModel.create(req.body);

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const foundUser = await User.userModel.findById(userId);

    if (!foundUser) {
      return res.status(404).send();
    } else {
      return res.status(200).json(foundUser);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("Not found!");
    } else {
      return res.status(204).send("User deleted!");
    }
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userBody = req.body;

    const updatedUser = await User.findUserByIdAndUpdate(userId, userBody);

    if (!updatedUser) {
      return res.status(404).send();
    } else {
      return res.status(204).send("User updated!");
    }
  } catch (error) {
    next(error);
  }
};

import { asyncHandler } from "../middlewares/errorHandling.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, dp } = req.body;
  // const myCloud = dp
  //   ? await cloudinary.uploader.upload(dp, {
  //       folder: "userDps",
  //       width: 150,
  //       crop: "scale",
  //     })
  //   : "no Dp available";
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ status: false, message: "email and password are required" });
  }

  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    return res.json({ message: "User already exists" }).status(400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await new UserModel({
    name,
    email,
    password: hashedPassword,
    //   profilePic: {
    //     public_id: dp ? myCloud.public_id : "no profilePic",
    //     url: dp ? myCloud.secure_url : "no profilePic",
    //   },
  });

  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
    expiresIn: 5 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    token,
    newUser: {
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
      likedAds: newUser.likedAds,
      orders: newUser.orders,
      ads: newUser.ads,
      role: newUser.role,
      createdAt: newUser.createdAt,
    },
    message: "Sign Up successfully",
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.json({ status: 401, message: "email or password is required" });
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res
      .json({
        status: false,
        message: "invalid email or password",
      })
      .status(400);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      status: false,
      message: "invalid email or password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 5 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    token,
    user,
    message: "Log in successfully",
  });
});

// ?? userDetails

export const userDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

// ?? updatePassword

export const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await UserModel.findById(_id).select("+password");
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res
      .json({
        status: false,
        message: "invalid password",
      })
      .status(400);
  }
  if (newPassword !== confirmPassword) {
    return res
      .json({
        status: false,
        message: "password Does not match",
      })
      .status(400);
  }
  const hashedPassword = await bcrypt.hash(confirmPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

// !! admin Route update User Role

export const updateUserRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const newUserData = { role };

  const user = await UserModel.findByIdAndUpdate(
    { id, newUserData },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  await user.save();
  res.status(200).json({
    success: true,
    message: "updated successfully",
  });
});

// !! admin Route delete User

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found with id of " + id,
    });
  }
  const name = user.name;
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "you deleted " + name,
  });
});

export const logOut = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

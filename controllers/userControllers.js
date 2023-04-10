const cloudinary = require("cloudinary");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../utils/sendingJWTtoken");

//singup user
const registerUser = asyncHandler(async (req, res) => {
  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return new ErrorHandler("Enter all fields", 400);
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "user already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hp = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    name,
    email,
    password: hp,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  if (user) {
    sendToken(user, 200, res);
  }
});

//login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter all fileds", 400));
  }
  const userExists = await userModel.findOne({ email }).select("+password");
  if (!userExists) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (userExists && !(await bcrypt.compare(password, userExists.password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    sendToken(userExists, 201, res);
  }
});

//logout
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//get user details
const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update user
// const updateUserDetails = asyncHandler(async (req, res, next) => {
//   const newData = { name: req.body.name, email: req.body.email };
//   if (req.body.avatar !== "") {
//     const user = await userModel.findById(req.user.id);

//     const imageId = user.avatar.public_id;

//     await cloudinary.v2.uploader.destroy(imageId);

//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });

//     newData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }
//   const user = await userModel.findByIdAndUpdate(req.user.id, newData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });
const updateUserDetails = asyncHandler(async (req, res, next) => {
  const newData = { name: req.body.name, email: req.body.email };
  if (
    req.body.avatar !== undefined &&
    req.body.avatar !== null &&
    req.body.avatar !== ""
  ) {
    // Add a check for empty or undefined avatar
    const user = await userModel.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await userModel.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

//get all user admin
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//get single user admin
const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//update user role --admin
const updateUserRole = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
  });
});

//delete user
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateUserDetails,
  getSingleUser,
  getAllUsers,
  updateUserDetails,
  updateUserRole,
  deleteUser,
};

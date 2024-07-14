import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please Enter all fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exist", 409));

  //   Upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "fadsfsda",
      url: "asdfasdf",
    },
  });

  sendToken(res, user, "Registered Successfully.", 201);
});

// Login wala part hai bhai
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // const file = req.file;

  if (!email || !password)
    return next(new ErrorHandler("Please Enter all fields", 420));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back ${user.name}`, 200);
});


// Logout wala part hai bhai

export const logout = catchAsyncError(async (req,res,next)=>{
  res.status(200).cookie("token", null,{
    expire: new Date(Date.now()),
  }).json({
    success:true,
    message:"Logged Out Successfully!",
  })
})
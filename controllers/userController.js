import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrarHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"
import {sendToken} from '../utils/sendToken.js'

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password)
    return next(new ErrarHandler("Please Enter all fields", 400));

  let user = await User.findOne({});

  if(user) return next(new ErrarHandler("User already exist", 409));

//   Upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar:{
        public_id: "fadsfsda",
        url: 'asdfasdf',
    },
  })

  sendToken(res, user, "Registered Successfully.", 201);

});

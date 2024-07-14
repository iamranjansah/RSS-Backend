import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrarHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password)
    return next(new ErrarHandler("Please Enter all fields", 400));

  let user = await User.findOne({});

  if(user) return next(new ErrarHandler("User already exist", 409));
});

import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

//REGISTER


export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })

    const existedData = await User.find({ "$or": [{ email: req.body.email }, { username: req.body.username }] })
    if (existedData.length > 0)
      return next(createError(500, "User already exist! Check your email or username."))

    await newUser.save()
    res.status(200).send("user has been created")
  } catch (err) {
    next(err)
  }
}

//LOGIN


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));


    const { password, isAdmin, ...otherDetails } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: isAdmin },
      process.env.JWT
    );

    res
      .cookie("access_token", token, {
        httpOnly: true
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

//LOGOUT

export const logout = (req, res) => {

  try {
    res.clearCookie("access_token")

    res.json("logout")
  } catch (error) {
    console.log(error)
  }
};

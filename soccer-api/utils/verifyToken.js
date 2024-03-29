import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "./error.js";



/*The role of this part is to prevent the user to 
accessing or changing data of others users */

export const verifyUser = (req, res, next) => {

  const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      if (user.id === req.params.id || user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  verifyToken(req, res, next)
};




/*This part limit data access unless the user is an administrator*/

export const verifyAdmin = (req, res, next) => {

  const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      if (user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You need to be an admin to execute this function."));
      }
    });
  };
  verifyToken(req, res, next)
};

export const isUserLoggedIn = (req, res, next) => {

  const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user

      User.findById(user.id, function (err, user) {
        if (err) throw err;
        if (user) {
          next()
        } else {
          console.log("User does not exist");
        }
      });
    })
  }
  verifyToken(req, res, next)
}
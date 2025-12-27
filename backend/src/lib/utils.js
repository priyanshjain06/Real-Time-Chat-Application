import jwt from "jsonwebtoken";

//REVIEW - jwt.sign() , cookie is signed with secret key and contains user id as payload ! 

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //REVIEW  send the reposne in cookie instead of header ,header is not secure since   it uses local storage and session storage which is accesed by js and console! 

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true, // Cookie cannot be accessed by JavaScript & browser send cookie automatically 
    sameSite: "strict", //Blocks cross-site requests from other domains 
    secure: process.env.NODE_ENV !== "development", //REVIEW
  });

  return token;
};

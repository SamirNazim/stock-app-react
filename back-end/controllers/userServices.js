const User = require("../model/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret";

const register = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findOne({ username: req.body.username });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({
      message: `${req.body.username} already exists!`,
      success: false,
    });
  }

  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: `${req.body.email} already exists!`, success: false });
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    img:
      req.body.image === undefined
        ? "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
        : req.body.image,
  });

  try {
    await user.save();
  } catch (err) {
    return res.json({ message: err });
  }

  return res.status(201).json({
    message: `${req.body.username} was succesfully registered!`,
    success: true,
  });
};

const login = async (req, res, next) => {
  let existingUser;

  //Checking Username
  try {
    existingUser = await User.findOne({ username: req.body.username });
  } catch (err) {
    return res.status(400).json({ message: err });
  }

  if (!existingUser) {
    return res.status(400).json({
      message: `${req.body.username} not found. Please register to login.`,
      success: false,
    });
  }

  //Checking Username/PW
  if (existingUser?.password === req.body.password) {
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 10000 * 300),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(201).json({
      message: `${req.body.username} has successfully logged in.`,
      success: true,
      user: existingUser,
      token,
    });
  } else {
    return res.status(400).json({
      message: `Incorrect Password. Please try again.`,
      success: false,
    });
  }
};

const checkUser = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findOne({ username: req.query.username });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({
      message: `${req.query.username} already exists! Pick another username.`,
    });
  }

  try {
    existingUser = await User.findOne({ email: req.query.email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: `${req.query.email} already exists!` });
  }

  return res.json({ message: "" });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  const token = cookies === undefined ? undefined : cookies.split("=")[1];

  if (!token || token === undefined) {
    return res.status(401).json({
      message: "No token found.",
    });
  }

  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token.",
      });
    }

    req.id = user.id;

    next();
  });
  // BEFORE USING COOKIE-PARSER
  // const headers = req.headers["authorization"];
  // const token = headers && headers.split(" ")[1];
  // if (!token) {
  //   res.status(401).json({
  //     message: "No token found.",
  //   });
  // }

  // jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({
  //       message: "Invalid token.",
  //     });
  //   }

  //   req.id = user.id;
  //   next();
  // });
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  return res.status(200).json({
    user,
  });
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res
      .status(400)
      .json({ message: "No token found in Refresh Token phase." });
  }

  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(403)
        .json({ message: "Verify failed in Refresh Token phase." });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });

    console.log("Refresh Token made: ", token);

    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 10000 * 300), // 30 seconds new Date(Date.now() + 10000 * 30)
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.register = register;
exports.login = login;
exports.checkUser = checkUser;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.logout = logout;

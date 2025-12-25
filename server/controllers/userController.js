const { UserModel } = require("../model/userModel.js");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res.status(299).json({ message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(299)
        .json({ message: "User already exists. Kindly Login" });
    }
    const newUser = await UserModel.create({
      username: name,
      email,
      password,
    });

    const token = newUser.generateToken();
    res.status(200).json({ message: "SignUp Successfully!", token, newUser });
  } catch (err) {
    res.status(299).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(299).json({ message: "Provide Email And Password!!" });
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res
    .status(299)
    .json({ message: "User doesn't exist Kindly Register!" });
  }
  const isPasswordMatched = await user.matchPassword(password);
  if (!isPasswordMatched) {
    return res.status(299).json({ message: "Invalid Credentials!" });
  }
  const token = user.generateToken();
  res.status(200).json({
    message: "Login Successfully!",
    token,
    user : {
      username: user.username,
      email: user.email,
    }
  });
};

exports.getUser = (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

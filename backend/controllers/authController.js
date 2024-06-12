import User from '../models/user.model.js';
export const signup = async (req, res, next) => {
    const { fullname, email, password} = req.body;
    const newUser = new User({
      fullname,
      email,
      password,
    });
  
    try {
      await newUser.save();
      res.json("signup successful");
      console.log('signup successful');
    } catch (error) {
      next(error);
    }
  };
  
  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      if(validUser.password === password) {
        res
        .status(200)
        .json(validUser);
      }else{
        res.status(404).json("Login Failed")
      }
    } catch (error) {
      next(error);
    }
  };
  export const signout = (req, res, next) => {
    try {
      res
        .clearCookie("access_token")
        .status(200)
        .json("User has been signed out");
    } catch (error) {
      next(error);
    }
  };
  
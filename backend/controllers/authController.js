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
  
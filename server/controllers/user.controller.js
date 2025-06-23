import User from "../models/user.model.js";

export const create = async (req, res) => {
  try {

    const newUser = new User(req.body);
    if (!newUser.name) {
      return res.status(400).json({ message: "The name is required" });
    }
    if (!newUser.email) {
      return res.status(400).json({ message: "The email is required" });
    }
    if (!newUser.address) {
      return res.status(400).json({ message: "The address is required" });
    }
    const exist = await User.findOne({ email: newUser.email });
    if (exist) return res.status(400).json({ message: "User already exists" });
    const saveData = await newUser.save();
    res.status(200).json({ message: "User registered", "id": saveData._id, date: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    //console.log(req.params)
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Not found" });
    user.name = req.body.name
    user.email = req.body.email
    user.address = req.body.address
    User.findByIdAndUpdate(id, user);
    res.status(202).json({ message: "User updated", date: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    //console.log(req.params)
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Not found" })
    await User.findByIdAndDelete(id);
    res.status(202).json({ message: "user deleted", date: new Date() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
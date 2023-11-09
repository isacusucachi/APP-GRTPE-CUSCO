import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      fullname,
      email,
      phoneNumber,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const allowedFields = {
      fullname: req.body.fullname,
      phoneNumber: req.body.phoneNumber,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      {
        new: true,
      }
    );
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserRoles = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const rolesFound = await Role.find({ name: { $in: req.body.roles } });
      const allowedFields = {
        roles: rolesFound.map((role) => role._id),
      };
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        allowedFields,
        {
          new: true,
        }
      );
      return res.status(201).json(updatedUser);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const matchPassword = await User.comparePassword(
        req.body.password,
        userFound.password
      );
      const New_old_equal = await User.comparePassword(
        req.body.newPassword,
        userFound.password
      );
      if (!matchPassword)
        return res.status(400).json({
          message: "Contraseña actual inválida",
        });
      else if (New_old_equal) {
        return res.status(400).json({
          message: "La nueva contraseña no puede ser igual a la anterior",
        });
      } else {
        const password = await User.encryptPassword(req.body.newPassword);
        await User.updateOne({ _id: req.params.id }, { password: password });
        res.status(200).json({
          message: "Actualizado con éxito",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

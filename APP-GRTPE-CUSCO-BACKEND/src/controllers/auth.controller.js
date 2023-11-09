import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/User.js";
import Role from "../models/Role.js";
import {
  SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
} from "../config.js";

export const signupHandler = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;

    // Creating a new User Object
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password,
    });

    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];

    // Saving the User Object in Mongodb
    await newUser.save();

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound)
      return res.status(404).json({
        message:
          "La dirección de correo electrónico que ingresaste no está conectada a una cuenta.",
      });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "La contraseña que has ingresado es incorrecta",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: "7D", // 24 hours
    });

    return res.status(200).json({
      _id: userFound._id,
      token,
      message: "Éxito",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound)
      return res.status(404).json({
        message:
          "La dirección de correo electrónico que ingresaste no está conectada a una cuenta.",
      });

    // Generate a reset token and set the expiry time (e.g., 1 hour)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = Date.now() + 300000; // 5 minute
    const resertTokenHashed = await User.encryptResetPasswordToken(resetToken);
    const allowedFields = {
      resetToken: resertTokenHashed,
      resetTokenExpiry: resetTokenExpiry,
    };
    const updatedUser = await User.findByIdAndUpdate(
      userFound._id,
      allowedFields,
      {
        new: true,
      }
    );

    // Send the email with the token link
    const transporter = nodemailer.createTransport({
      // Replace with your email service configuration
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: updatedUser.email,
      subject: "Solicitud de restablecimiento de contraseña",
      html: `<p>Est&aacute; recibiendo este correo electr&oacute;nico porque usted (u otra persona) ha solicitado restablecer su contrase&ntilde;a. Por favor ingrese el siguiente c&oacute;digo para restablecer su contrase&ntilde;a:&nbsp;</p>
      <p style="text-align: center;"><strong>${resetToken}</strong></p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({
          message: "A ocurrido un error al momento de enviar el email.",
        });
      } /*  */
      res.status(200).json({
        message:
          "Email enviado. Revise su bandeja de entrada para obtener más instrucciones.",
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyResetPasswordTokenHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound)
      return res.status(404).json({
        message:
          "La dirección de correo electrónico que ingresaste no está conectada a una cuenta.",
      });
    const matchToken = await User.compareResetPasswordToken(
      req.body.token,
      userFound.resetToken
    );
    if (!(matchToken && userFound.resetTokenExpiry > Date.now())) {
      return res.status(401).json({ message: "Token no válido o caducado." });
    }
    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPasswordTokenHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound)
      return res.status(404).json({
        message:
          "La dirección de correo electrónico que ingresaste no está conectada a una cuenta.",
      });
    const matchToken = await User.compareResetPasswordToken(
      req.body.token,
      userFound.resetToken
    );
    if (!(matchToken && userFound.resetTokenExpiry > Date.now())) {
      return res.status(401).json({ message: "Token no válido o caducado." });
    }
    const New_old_equal = await User.comparePassword(
      req.body.newPassword,
      userFound.password
    );
    if (New_old_equal) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    } else {
      const password = await User.encryptPassword(req.body.newPassword);
      await User.updateOne({ _id: userFound._id }, { password: password });
      res.status(200).json({
        message: "Actualizado con éxito",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

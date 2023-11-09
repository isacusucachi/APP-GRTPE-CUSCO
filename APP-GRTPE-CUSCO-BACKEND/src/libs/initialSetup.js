import Role from "../models/Role.js";
import User from "../models/User.js";
import {
  ADMIN_EMAIL,
  ADMIN_FULLNAME,
  ADMIN_PASSWORD,
  ADMIN_PHONENUMBER,
} from "../config.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount({ maxTimeMS: 100000 });

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  try {
    // check for an existing admin user
    const userFound = await User.findOne({ email: ADMIN_EMAIL });
    if (userFound) return;

    // get roles _id
    const roles = await Role.find({
      name: { $in: ["user", "moderator", "admin"] },
    });

    // create a new admin user
    const newUser = await User.create({
      fullname: ADMIN_FULLNAME,
      email: ADMIN_EMAIL,
      phoneNumber: ADMIN_PHONENUMBER,
      password: ADMIN_PASSWORD,
      roles: roles.map((role) => role._id),
    });

    console.log(`new user created: ${newUser.email}`);
  } catch (error) {
    console.error(error);
  }
};

export const ejecutar = async () => {
  await createRoles();
  await createAdmin();
};

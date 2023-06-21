import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sPass = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: sPass });
    const result = await admin.save();
    if (result) {
      res.status(201).send("Registered");
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    //console.log(req.body.cred);
    //const email = req.body.email;
    //const password = req.body.password;
    const admin = await Admin.findOne({ email: req.body.cred.email });
    //const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(401).send("Not Found");
    }

    const isCorrect = await bcrypt.compare(
      req.body.cred.password,
      admin.password
    );
    //const isCorrect = bcrypt.compare(password, admin.password);
    if (!isCorrect) {
      res.status(401).send("Incorrect Password");
    } else {
      const token = await admin.generateAuthToken();
      const { password } = admin._doc;
      res
        .cookie("accessTokenAdmin", token, {
          expires: new Date(Date.now() + 80 * 60000),
          httpOnly: true,
        })
        .status(201)
        .send("logged in");
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutAdmin = async (req, res) => {
  res
    .clearCookie("accessTokenAdmin", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Admin has been logged out.");
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, rePassword } = req.body;
    console.log(oldPassword);
    if (newPassword !== rePassword) {
      res.status(401).send("Password Mismatch");
    }
    const resp = await Admin.findOne({ email });
    console.log(myVar);
    if (resp) {
      const verifyPass = await bcrypt.compare(resp.password, oldPassword);
      if (verifyPass) {
        newPassword = await bcrypt.hash(newPassword, 10);
        const updatePass = await Admin.findOneAndUpdate(
          { email },
          { $set: { password: newPassword } }
        );
        if (updatePass) {
          res.status(201).send("Updated Successfuly");
        }
      } else {
        res.status(403).send("Old Password  Not Correct");
      }
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

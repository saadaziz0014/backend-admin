import jwt from "jsonwebtoken";

export const verifyTokenAdmin = (req, res, next) => {
  const token = req.cookies.accessTokenAdmin;
  if (!token) {
    console.log("not verified");
    res.status(401).send("No Token Present");
  } else {
    jwt.verify(token, process.env.JWT_KEYA, async (err, payload) => {
      next();
    });
  }
};

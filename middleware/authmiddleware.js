import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
  console.log("Authenticatd called");
  try {
    let accessToken = req.headers.authorization;

    console.log("Token", accessToken);
    let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log("DECODED VALUE: ", decoded);

    let user = await getUser({ email: decoded.email });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};

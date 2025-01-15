import jwt from "jsonwebtoken";

const isAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.SECRATE_KEY);

    console.log("Decoded token:", decode);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach user ID to the request object
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);

    return res.status(500).json({
      success: false,
      message: "Authentication failed. Please try again later.",
    });
  }
};

export default isAuthenticate;

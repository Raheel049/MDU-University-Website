import jwt from "jsonwebtoken";

export const checkAuthMiddleware = (request, response, next) => {
  try {
    // 1. Key ko .env se lein (Suraksha pehle!)
    const PRIVATE_KEY = process.env.PRIVATE_KEY ; 
    
    // 2. Token nikalna safely
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "UnAuthorized: Token missing or invalid format!",
        status: false
      });
    }

    const token = authHeader.split(" ")[1];

    // 3. Verify Token
    // Agar token invalid hoga ya expire, to ye seedha catch block mein bhej dega
    const decoded = jwt.verify(token, PRIVATE_KEY);

    // 4. Verification Check
    if (decoded) {
      request.user = decoded; // User ka data request mein save kar lia taake controller mein kaam aaye
      console.log("userData",request.user);
      next();
    } else {
      return response.status(401).json({
        message: "Unauthorized User",
        status: false
      });
    }

  } catch (error) {
    // 5. Specific Error Handling
    const msg = error.name === "TokenExpiredError" ? "Token Expired!" : "Invalid Token!";
    return response.status(403).json({
      message: msg,
      status: false
    });
  }
};
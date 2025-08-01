import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("verifyToken middleware hit");
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1]; // split the token from bearer
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adds user info to request
    next();
  } catch (err) {
    res.status(404).json({ message: 'Invalid or expired token' });
  }
};

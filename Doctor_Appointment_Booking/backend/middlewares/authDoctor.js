import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.docId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please login again.' })
  }
}

export default authDoctor

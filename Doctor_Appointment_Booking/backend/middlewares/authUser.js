import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Please login again." })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Invalid or expired token. Please login again." })
    }
}

export default authUser

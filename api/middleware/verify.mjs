import User from '../models/user.mjs'
import jwt from 'jsonwebtoken'
// Verify password and username
// Verify token
// return res.status(404) if any of above fails
// send user info to next middleware
export const verifyUser = async (req, res, next) => {
  // req: username, old_password
  const secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : global.TokenSecret
  const user = await User.findOne({ _id: req.body._id })
  if (!user) return res.status(404).send('User not found')
  // console.log(req.body.token)
  jwt.verify(req.body.token, secret, async (err, user) => {
    // console.log(user)
    if (err) return res.status(403).send('Invalid token.')
    req.user = await User.findOne({ _id: user._id })
    req.old_password = user.password
    next()
  })
}
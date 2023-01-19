import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import User  from '../models/user.mjs'
import express from 'express'
const authRouter = express.Router();
// /api/auth
//login - Not using joi validation
authRouter.post('/login', async (req, res) => {
  // First use mongoose schema with Joi validator to see if username and
  // password are valid input, not valid matching password
  //  Now find the user by their username
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send('Incorrect username or password.');
  }
  // Then validate the Credentials in MongoDB match those provided in the request.
  // Will return false if password was not encrypted during creation despite matching.
  // Shall not accept matching unencrpyted password for security reasons.
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // console.log(req.body,validPassword)
  if (!validPassword) return res.status(400).send('Incorrect email or password.');
  // If verified, return a jwt, and user id & username
  const token = jwt.sign({ _id: user._id }, 'secret');
  console.log('this is token' + token)
  // Set tokens to header and return basic user info,
  res.header({ 'x-auth-token': token, 'authorization': `Bearer ${token}` })
    .send(_.assign({ token: token }, _.pick(user, ['_id', 'email', 'username', 'created_at', 'updated_at', 'followers', 'following', 'profile_image', 'bio'])));
  // console.log(req.headers)
});
authRouter.post('/verify', async (req, res, next) => {
  // console.log(req.body.token, 'this is the verify token')
  return await jwt.verify(req.body.token, 'secret',
    // process.env.TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).send('invalid token')
      let userData
      try { await User.findOne({ _id: user._id }).then(r=>userData =r) } catch (error) {
        return res.status(401).send(error)
      }
      // console.log(userData)
      userData.active = true
      await userData.save()
      return res.send(userData)
    }
  )
}
)
  export default authRouter
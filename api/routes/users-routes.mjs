import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.mjs";
import _ from 'lodash'
import { verifyUser } from "../middleware/verify.mjs";

const userRouter = express.Router()

const createUser = async (req,res) => {
    // Without Joi validation, i need to figure out how to send an error to front end with mongoose validation
    let secret
    //
    //Check if user already exists
    let user = await User.findOne({ $or: [
      { username: req.body.username },
      {email: req.body.email}
    ]})
    //
    if (user) {
      return res.status(400).send('That username or email is already taken.');
    }
      // Insert the new user if they do not exist yet
    try {
      user = await new User(_.assign(_.pick(req.body, ['username', 'email', 'password', 'bio']), { _id: new mongoose.Types.ObjectId() }))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log('RUNNING SAVE')
    secret = 'secret'
    // process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : global.TokenSecret
      const token = jwt.sign({ _id: user._id }, secret);
    return res.header('x-auth-token', token).send(_.assign(_.pick(user, ['_id', 'username', 'email', 'password', 'created_at', 'bio']), {token: token}));
    } catch (errors) {
      console.log(errors)
      let errorMessages = []
        Object.keys(errors).forEach(key => errorMessages.push(errors[key].properties.message))
      console.log(errors)
      const errorObject = {
        errors: errorMessages
      }
      return res.status(403).send(errorObject)
    }
  };
  userRouter.post('/create', createUser)

  const getAllUsers = async (req, res) => {
    const users = await User.find({})
    return res.send(users)
  }
  userRouter.get('/get-all', getAllUsers)
  // Find one user /:id
  const getOneUser = async (req,res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(401).send('ID input is empty');
    let user
    try { await User.findOne({ _id: req.params.id }).then(ele=>user=ele) } catch(err) { return res.status(404).send('User not found')}
      // console.log(res)
    return res.send(_.pick(user, ['_id', 'username', 'email', 'bio', 'category_subscriptions', 'following',
        'followers', 'liked_posts', 'preferences', 'created_comments', 'liked_comments', 'saved_posts', 'created_at', 'updated_at']));
  }
  userRouter.get('/:id', getOneUser)

  const searchForUser = async (req, res) => {
    let searchResults = []
    try { await User.find({ username: { $regex: req.params.search_input, $options: 'i' } }).lean().limit(10).select('username preferences').then(r=>searchResults = r) } catch (err) { return res.status(404).send('No users were found') }
    console.log(searchResults)
    return res.send(searchResults)
  }
  userRouter.get('/query-users/:search_input' , searchForUser)
  // Find one user /:id
  const getBasicUserInfo = async (req,res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(401).send('ID input is empty');
    let user
    try { await User.findOne({ _id: req.params.id }).lean().then(ele=>user=ele) } catch(err) { return res.status(404).send('User not found')}
      // console.log(res)
    return res.send(_.pick(user, ['_id', 'username', 'email', 'bio', 'created_at', 'preferences', 'updated_at']));
  }
  userRouter.get('/basic-info/:id', getBasicUserInfo)
  const getOneByUsername = async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).send('Cannot find user')
    res.send(user)
  }
  userRouter.get('/get-by-username/:username', getOneByUsername)
  const changePassword = async (req, res, next) => {
      // console.log(req.headers)
      // console.log(req.body, req.user)
      const validPassword = await bcrypt.compare(req.body.old_password, req.user.password);
      if (!validPassword) return res.status(400).send('Incorrect email or password.');
      const salt = await bcrypt.genSalt(10);
      req.user.password = await bcrypt.hash(req.body.new_password, salt);
      await req.user.save();
      return res.send(req.user)
    }
    userRouter.put('/change-password',verifyUser, changePassword)
    // Get all followers info
  const getAllFollowersInfo = async (req, res, next) => {
    let user
    try { await User.findOne({ _id: req.params.id }).then(ele => user = ele) } catch (err) { return res.status(404).send('User not found.') }
    const followers = await User.find({ _id: { $in: user.followers } })
    return res.send(followers)
  }
  userRouter.get('/all-followers/:id', getAllFollowersInfo)


  // Get all info of following array
  const getAllFollowingInfo =  async (req, res, next) => {
    let user
    try { await User.findOne({ _id: req.params.id }).then(ele =>{ user = ele}) } catch (err) { return res.status(404).send('User not found.') }
    const following = await User.find({ _id: { $in: user.following } })
    return res.send(following)
  }
  userRouter.get('/all-following/:id', getAllFollowingInfo)
  // req: usersArray[ids]
  const findManyUsers = async (req, res) => {
    let users
    try { await User.find({ _id: { $in: req.body.user_id_array } }).lean().then(ele => { users = ele }) } catch (err) {return res.status(404).send('Cant find users')}
    return res.send(users)
  }
  userRouter.post('/find-many-users', findManyUsers)
  // Follow/unfollow a user
  const followUser =  async (req, res, next) => {
    let targetUser, user
    try { await User.findOne({ _id: req.body.target_user_id }).then(ele => targetUser = ele) } catch (err) { return res.status(404).send('Target user not found.') }
    try {await User.findOne({_id: req.body.user_id}).then(ele=>user=ele)} catch(err) { return res.status(404).send("cannot find user.")}
    const isFollowing = targetUser.followers.find(e => e.equals(user._id))
    if (isFollowing) {
      targetUser.followers.splice(isFollowing, 1)
      user.following.splice(user.following.find(e=>e.equals(targetUser._id), 1))
    } else {
      targetUser.followers.push(user._id)
      user.following.push(targetUser._id)
    }
    await targetUser.save()
    await user.save()
    return res.send(targetUser)
  }
  userRouter.post('/follow', followUser)
  // These two api calls can be combined into one with a double query
  // Delete user by ID
  const deleteUserById = async (req, res, next) => {
    res.send(await User.deleteOne({_id: req.body._id}))
  }
  userRouter.delete('/delete-by-Id', deleteUserById)
  // Delete user by username
  const deleteUserByUsername =  async (req, res, next) => {
    res.send(await User.deleteOne({_id: req.body.username}))
  }
  userRouter.delete('/delete-by-username',deleteUserByUsername)
  // Edit user basic info - username, email, bio, profile picture
  const editUser = async (req, res, next) => {
    let user
    await User.findOne({ _id: req.body._id }).then(ele=> { user = ele})
    if(!user) return res.status(404).send('User not found.')
    _.assign(user, {
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
      profile_image: req.body.profile_image
    })
    await user.save()
    res.send(user)
  }
  userRouter.put('/edit', editUser)
  // req: user_id
  const logUserOut = async (req, res) => {
    let user
    try { await User.findOne({ _id: req.body.user_id }).then(r => user = r) } catch (err) { return res.status(404).send('user not found') }
    console.log(user)
    user.active = false
    user.save()
    return res.status(200)
  }
  userRouter.post('/log-out', logUserOut)
  // For testing purposes only
//   userRouter.post('/create-many-users', async (req, res) => {
//     await User.deleteMany()
//     const dataArray = randomStrings.map((ele, i) => {
//       const randomElement = randomNames[Math.floor(Math.random() * randomNames.length)];
//       const randomUsername = randomElement + i + Math.floor(Math.random() * randomNames.length)
//       return ({
//         username: randomUsername,
//         email: randomUsername + '@gmail.com',
//         password: 'testpass123',
//         bio: `contact me at ${randomUsername + '@gmail.com'}`,
//         preferences: {
//           dark_mode: true,
//           avatar_color: randomColors[Math.floor(Math.random() * randomColors.length)]
//         }
//       })
//     })
//     await User.insertMany(dataArray)
//     return res.send(dataArray)
//   })




  export default userRouter
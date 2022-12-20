import Category from '../models/category.mjs';
import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import User from '../models/user.mjs'
const categoryRouter = express.Router();
//api/category
// req: name, image, descripton
// CREATE ONE
categoryRouter.post('/create', async (req, res, next) => {
  const doesExist = await Category.findOne({ name: req.body.name })
  console.log(doesExist)
  if(doesExist) return res.status(403).send('Category already exists')
  let category = new Category(_.assign(_.pick(req.body,
  ['name', 'image', 'description', 'admin']), {_id: new mongoose.Types.ObjectId() }))
  console.log(category);
  category.save();
  res.send(category)
})
// req: user_id, category_name
const followCategory = async (req, res) => {
  let user, category
  try { await User.findOne({ _id: req.body.user_id }).then(ele => {user = ele}) } catch (err) { return res.status(404).send('Cannot find user') }
  try {await Category.findOne({name: req.body.category_name}).then(e=>category=e) } catch (err) {return res.status(404).send('Category does not exist')}
  const isSubscribed = user.category_subscriptions.findIndex(id => id.equals(category._id))
  if (isSubscribed === -1) {
    user.category_subscriptions.push(category._id)
    console.log(user.category_subscriptions)
    category.followers.push(user._id)
  } else {
    user.category_subscriptions.splice(isSubscribed, 1)
    category.followers.splice(category.followers.findIndex(x=> x === user._id), 1)
  }
  await user.save()
  await category.save()
  // console.log(category)
  return res.send(user)
}
categoryRouter.post('/follow-category', followCategory)
// FIND ALL
categoryRouter.get('/all', async(req, res, next) => {
  const allCategories = await Category.find({});
  if(!allCategories) return res.status(201).send('No categories were found.')
  console.log(allCategories);
  return res.send(allCategories)
})
// FIND ONE
categoryRouter.get('/name/:name', async (req, res, next) => {
  let category
  try { await Category.findOne({ name: req.params.name }).lean().then(e => category = e) } catch(err) {return res.status(404).send('Category not found')}
  return res.send(category)
})
// FIND ONE
categoryRouter.get('/id/:id', async (req, res, next) => {
  let category
  try { await Category.findOne({ _id: req.params.id }).then(ele => category = ele) }
  catch (err) { return res.status(404).send('Category does not exist') }
  return res.send(category)
})
// Change One
// Can edit name, image, description, admin
categoryRouter.put('/edit', async (req, res, next) => await Category
  .findOne({
    name: req.body.original_name
  }).then(ele => {
    if (!ele) return res.status(404).send('category not found');
      console.log(ele)
    _.assign(ele, {
      name: req.body.new_name,
      image: req.body.image,
      description: req.body.description,
      admin: req.body.admin
    })
    ele.save();
    res.send(ele);
  })
)
// Delete
categoryRouter.delete('/delete', async (req, res) =>
  res.send(await Category.deleteOne({ name: req.body.name }, {})
))
export default categoryRouter;
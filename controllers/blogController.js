import ExpressError from '../middleware/ExpressError.js';
import Blog from '../models/blogSchema.js';
import { blogsSchemaValidate } from '../schemaValidation/blogsSchemaValidate.js';

export const getBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  // console.log("req user: ", req.user)
  if (!blogs) return next(new ExpressError(401, "No Blogs found"))
  res.json(blogs);
};

export const addBlog = async (req, res, next) => {
  const { error, value } = blogsSchemaValidate.validate(req.body, { abortEarly: false })
  if (error) return next(new ExpressError(400, error.details[0].message))
  const blog = await Blog.create({ ...value });
  console.log("4. add blog")
  res.status(201).json(blog);
};
export const singleBlog = async (req, res, next) => {
  // console.log("params: ", req.params)
  const id = req.params.id;
  const blog = await Blog.findOne({ _id: id });
  if (!blog) return next(new ExpressError(400, "No single blog"))
  // console.log("1. single blog", blog)
  res.json(blog);
};
export const editBlog = async (req, res, next) => {
  console.log("req user: ", req.params)
  const id = req.params.id
  const { error, value } = blogsSchemaValidate.validate(req.body, { abortEarly: false, allowUnknown: true , stripUnknown:true})
  if (error) return next(new ExpressError(400, error.details[0].message))
  console.log("values: ", value)
  const { title, summary } = value
  console.log("id: ", id)
  const blog = await Blog.findByIdAndUpdate(id, { title, summary }, { new: true });
  console.log("4. update blog", blog)
  res.status(201).json(blog);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};

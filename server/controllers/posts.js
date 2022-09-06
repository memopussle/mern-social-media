import PostMessage from "../models/postMessage.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();
// this handles logic from postsRoutes
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages); //json = send
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create a post
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; // rename id -> _id

  const post = req.body;

  //if id is not valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id }, // update the post with the id
    { new: true }
  ); //update the new post by target the _id & post
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  
  await PostMessage.findByIdAndRemove(id);
  console.log("DELETE")

  res.json({message: "Post deleted sucessfully"})

}

export const likePost = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true }) 
  
  res.json(updatedPost);
  
}
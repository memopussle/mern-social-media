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


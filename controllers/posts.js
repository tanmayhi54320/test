import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose';
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;
    const newPost = PostMessage({ title, message, selectedFile, creator, tags });
    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost=async (req,res)=>{
    //console.log(req);
    //const { id:_id } = req.params;
    const { _id,title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No post with the ID");
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id };

    await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });

    res.json(updatedPost);

}

export const deletePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post With that id');
    }

    await PostMessage.findByIdAndRemove(id);

    console.log("Delete!!!!");

    res.json({message:'Post with the message deleted'});
};

export const likePost=async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).send('There is no such Post');
    }

    const post=await PostMessage.findById(id);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});

    res.json(updatedPost);
};
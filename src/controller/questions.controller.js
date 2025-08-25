import {QuestionsModel} from "../models/questions.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";

export const create = asyncHandling(async (req , res )=>{
    const { question , answer }= req.body
    if(!question || !answer ){
        res.status(404).json({ message:" please enter the question and the answer "})
    }
    const exist = await QuestionsModel.findOne({ question })
    if( exist ){ res.status(404).json({message:" this question already exist "})}
   const questions = await QuestionsModel.create({
        question, answer
    });
        sucssesResponse({
        res,
        data: {questions},
        message:" The question was added "
})
})

export const getallqustion = asyncHandling(async (req , res )=>{
    const { limit }= req.query
    const questions = await QuestionsModel.find()
    .sort({ date: -1 })
    .limit(Number(limit)|| 0)
        sucssesResponse({
        res,
        data: {questions},
})
})

export const updatequstion = asyncHandling(async (req , res )=>{
const { question, answer } = req.body
    const updated = await QuestionsModel.findByIdAndUpdate(
        req.params.id ,
        { question, answer }  , { new: true })

  if (!updated) {
    const error = new Error("a question not found");
    error.statusCode = 404;
    throw error;
  }
        if( !question || !answer ){
        res.status(404).json({ message:" please enter the question and the answer "})
    }
 
        sucssesResponse({
        res,
        data: {updated},
})
})

export const deletequstion =  asyncHandling(async (req , res )=>{
   const deleted = await QuestionsModel.findByIdAndDelete(
    req.params.id ,{ new: true })
  if (!deleted) {
    const error = new Error("a question not found");
    error.statusCode = 404;
    throw error;
  }
   res.json({ message: "question deleted" });


})

import { asyncHandling } from "../utils/error-Handling.js";
import { ArticleModel } from "../models/articles.model.js";
import { sucssesResponse } from "../utils/response-Handling.js";

// 📝 Create Article
export const createArticle = asyncHandling(async (req, res) => {
  const { number, date, author, title, content, image } = req.body;

    const existitle = await ArticleModel.findOne({title})
    if (existitle){  res.status(409).json({ message:"This artical title already exists" }); } else{

        
  const article = await ArticleModel.create({
    number,
    date,
    author,
    title,
    content,
    image,
  });

  return sucssesResponse({
    res,
    code: 201,
    message: "✅ Article created successfully",
    data: article,
  });
      }

});

// ✏️ Update Article
export const updateArticle = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const article = await ArticleModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      content: req.body.content,
      image: req.body.image,
    },
    { new: true }
  );

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Article updated successfully",
    data: article,
  });
});

// 📃 Get Articles List
export const getArticlesList = asyncHandling(async (req, res) => {
  const { limit } = req.query;

  const articles = await ArticleModel.find()
    .select("title author date image")
    .sort({ date: -1 })
    .limit(Number(limit) || 0);

  if (articles.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No articles found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Articles list fetched",
    data: articles,
  });
});

// 📖 Get Article Details
export const getArticleDetails = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const article = await ArticleModel.findById(id);
  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Article details fetched",
    data: article,
  });
});

// 🔍 Search Articles
export const searchArticles = asyncHandling(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "⚠️ Please provide a search keyword",
    });
  }

  const articles = await ArticleModel.find(
    {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } },
      ],
    },
    "title author date image"
  ).sort({ date: -1 });

  if (articles.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No articles matched your search",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Search results fetched",
    data: articles,
  });
});

// 🗑️ Delete Article
export const deleteArticle = asyncHandling(async (req, res) => {

  const article = await ArticleModel.findByIdAndDelete(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Article deleted successfully",
  });
});
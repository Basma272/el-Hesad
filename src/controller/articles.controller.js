import { asyncHandling } from "../utils/error-Handling.js";
import { ArticleModel } from "../models/articles.model.js";
import { sucssesResponse } from "../utils/response-Handling.js";
import { translate } from "../utils/translate.js";

// 📝 Create Article
export const createArticle = asyncHandling(async (req, res) => {
  const { date, author, title, content, description } = req.body;

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const existitle = await ArticleModel.findOne({ title });
  if (existitle) {
    return res
      .status(409)
      .json({ message: "This article title already exists" });
  }

  const article = await ArticleModel.create({
    date,
    author,
    title,
    content,
    description,
    image: imageUrl,
  });

  return sucssesResponse({
    res,
    code: 201,
    message: "✅ Article created successfully",
    data: translate(article.toObject(), req.lang), // 👈 ترجمة
  });
});

// ✏️ Update Article
export const updateArticle = asyncHandling(async (req, res) => {
  const { id } = req.params;

  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const article = await ArticleModel.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      date: req.body.date,
      author: req.body.author,
      content: req.body.content,
      description: req.body.description,
      image: imageUrl,
    },
    { new: true }
  );

  if (!article) {
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  }

  return sucssesResponse({
    res,
    message: "✅ Article updated successfully",
    data: translate(article.toObject(), req.lang), // 👈 ترجمة
  });
});

// 📃 Get Articles List with Pagination
export const getArticlesList = asyncHandling(async (req, res) => {
  const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  // 📝 pagination params
  const page = parseInt(req.query.page) || 1;     // لو مش مبعوت => صفحة 1
  const limit = parseInt(req.query.limit) || 10;  // لو مش مبعوت => 10 مقالات
  const skip = (page - 1) * limit;

  // 🗃 get data
  const [articles, total] = await Promise.all([
    ArticleModel.find().lean().sort({ date: -1 }).skip(skip).limit(limit),
    ArticleModel.countDocuments()
  ]);

  if (articles.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No articles found" });
  }

  const translated = translate(articles, lang);

  return sucssesResponse({
    res,
    message: "✅ get all Articles",
    data: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,  // 🔥 لو عايزة تضيفيها
      prevPage: page > 1 ? page - 1 : null,                        // 🔥 لو عايزة تضيفيها
      items: translated
    }
  });
});
// 📖 Get Article Details
export const getArticleDetails = asyncHandling(async (req, res) => {
  const { id } = req.params;
 const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  const article = await ArticleModel.findById(id).lean();

  if (!article) {
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  }
    const translated = translate(article , lang);
          

  return sucssesResponse({
    res,
    message: "✅ Article details fetched",
    data: translated // 👈 ترجمة
  });
});


// 🔍 Search Articles
export const searchArticles = asyncHandling(async (req, res) => {
       const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

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
        { "title.ar": { $regex: keyword, $options: "i" } },
        { "title.en": { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } },
      ],
    },
    "title author date image description"
  ).lean().sort({ date: -1 });

  if (articles.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No articles matched your search",
    });
  }
  
    const translated = translate(articles , lang);
          


  return sucssesResponse({
    res,
    message: "✅ Search results fetched",
    data:translated , // 👈 ترجمة
  });
});

// 🗑 Delete Article
export const deleteArticle = asyncHandling(async (req, res) => {
  const article = await ArticleModel.findByIdAndDelete(req.params.id);

  if (!article) {
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  }return sucssesResponse({
    res,
    message: "✅ Article deleted successfully",
  });
});
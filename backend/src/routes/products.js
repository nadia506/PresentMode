// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const Product = require("../models/Product");
// const multer = require("multer");

// // POST route for creating a new product
// router.post("/", auth, async (req, res, next) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     return res.sendStatus(201);
//   } catch (error) {
//     next(error);
//   }
// });

// // Multer configuration for handling image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({ storage: storage }).single("file");

// // POST route for uploading product images
// router.post("/image", auth, async (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.json({ fileName: res.req.file.filename });
//   });
// });

// // GET route for fetching products based on filters, search, pagination
// router.get("/", async (req, res, next) => {
//   const order = req.query.order || "desc";
//   const sortBy = req.query.sortBy || "_id";
//   const limit = parseInt(req.query.limit) || 20;
//   const skip = parseInt(req.query.skip) || 0;
//   const term = req.query.searchTerm;
//   const category = req.query.category;

//   let findArgs = {};
//   for (let key in req.query.filters) {
//     if (req.query.filters[key].length > 0) {
//       if (key === "price") {
//         findArgs[key] = {
//           $gte: req.query.filters[key][0],
//           $lte: req.query.filters[key][1],
//         };
//       } else {
//         findArgs[key] = req.query.filters[key];
//       }
//     }
//   }

//   if (term) {
//     findArgs["$text"] = { $search: term };
//   }

//   try {
//     const products = await Product.find(findArgs)
//       .populate("writer")
//       .sort([[sortBy, order]])
//       .skip(skip)
//       .limit(limit);

//     const productsTotal = await Product.countDocuments(findArgs);
//     const hasMore = skip + limit < productsTotal ? true : false;

//     return res.status(200).json({
//       products,
//       hasMore,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // GET route for fetching products by categoryId
// router.get("/category/:categoryId", async (req, res, next) => {
//   const categoryId = req.params.categoryId;
//   const order = req.query.order || "desc";
//   const sortBy = req.query.sortBy || "_id";
//   const limit = parseInt(req.query.limit) || 20;
//   const skip = parseInt(req.query.skip) || 0;
//   const term = req.query.searchTerm;
//   const filters = req.query.filters || {};

//   let findArgs = { categories: categoryId };

//   for (let key in filters) {
//     if (filters[key].length > 0) {
//       if (key === "price") {
//         findArgs[key] = {
//           $gte: filters[key][0],
//           $lte: filters[key][1],
//         };
//       } else {
//         findArgs[key] = filters[key];
//       }
//     }
//   }

//   if (term) {
//     findArgs["$text"] = { $search: term };
//   }

//   try {
//     const products = await Product.find(findArgs)
//       .populate("writer")
//       .sort([[sortBy, order]])
//       .skip(skip)
//       .limit(limit);

//     const productsTotal = await Product.countDocuments(findArgs);
//     const hasMore = skip + limit < productsTotal;

//     return res.status(200).json({
//       products,
//       hasMore,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   const type = req.query.type;
//   let productIds = req.params.id;

//   if (type === "array") {
//     let ids = productIds.split(",");
//     productIds = ids.map((item) => {
//       return item;
//     });
//   }

//   try {
//     const product = await Product.find({ _id: { $in: productIds } }).populate(
//       "writer"
//     );

//     return res.status(200).send(product);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");

// POST route for creating a new product
router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("file");

// POST route for uploading product images
router.post("/image", auth, async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

// GET route for fetching products based on filters, search, pagination
router.get("/", async (req, res, next) => {
  const order = req.query.order || "desc";
  const sortBy = req.query.sortBy || "_id";
  const limit = parseInt(req.query.limit) || 20;
  const skip = parseInt(req.query.skip) || 0;
  const term = req.query.searchTerm; // Get search term from query parameters

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.query.filters[key][0],
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }

  if (term) {
    // If search term is provided, add text search capability
    findArgs["$text"] = { $search: term };
  }

  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

// GET route for fetching products by categoryId
router.get("/category/:categoryId", async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const order = req.query.order || "desc";
  const sortBy = req.query.sortBy || "_id";
  const limit = parseInt(req.query.limit) || 20;
  const skip = parseInt(req.query.skip) || 0;
  const term = req.query.searchTerm;
  const filters = req.query.filters || {};

  let findArgs = { categories: categoryId };

  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: filters[key][0],
          $lte: filters[key][1],
        };
      } else {
        findArgs[key] = filters[key];
      }
    }
  }

  if (term) {
    // If search term is provided, add text search capability
    findArgs["$text"] = { $search: term };
  }

  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

// GET route for fetching product by ID or IDs (array)
router.get("/:id", async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id;

  if (type === "array") {
    let ids = productIds.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  try {
    const product = await Product.find({ _id: { $in: productIds } }).populate(
      "writer"
    );

    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

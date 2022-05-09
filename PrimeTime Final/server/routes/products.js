import products from "../models/Product.js";
import express from "express";
const router = express.Router();
import Course from "../models/course.js";
import User from "../models/user.js";
import Customization from "../models/customization.js";
import multer from 'multer';

import cors from "cors";

router.use(cors());

router.get("/slug/:slug", async (req, res) => {
  const product = await products.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});


router.get('/searchproduct/:keyword',async(req,res)=>{
  let search = req.params.keyword
  console.log( req.params.keyword)
  

  try{
      
      const products222= await products.find({"productName": { $regex: '.*' + search + '.*' } })
      console.log(products222)
      await res.json(products222)

      

      
      
  }catch(err){
      res.send('Error'+err)
  }

})
router.get("/recomAndcustom/:id", async (req, res) => {
  try {
    const product = await products.find();
    //custombyuserid
    console.log(req.params.id);
    const customizations = await Customization.find({ user: req.params.id });

    var duplicates = product.filter(function (val) {
      return customizations.some(function (o2) {
        //console.log(val);
        //console.log(o2);
        return (
          o2.type?.toLowerCase() === val.type?.toLowerCase() &&
          o2.violonBody?.toLowerCase() === val.violonBody?.toLowerCase() &&
          o2.violonStick?.toLowerCase() === val.violonStick?.toLowerCase() &&
          o2.violonChincrest?.toLowerCase() ===
            val.violonChincrest?.toLowerCase()
        ); // return the ones with equal id
      });
    });

    res.json(duplicates);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCateg = req.query.category;
  try {
    let prods;
    if (qNew) {
      prods = await products.find().sort({ createdAt: -1 }).limit(3);
    } else if (qCateg) {
      prods = await products.find({
        categories: {
          $in: [qCateg],
        },
      });
    } else {
      prods = await products.find();
    }

    // const prod = await products.find().sort({_id:-1})
    res.json(prods);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const prod = new products({
    productName: req.body.productName,
    description: req.body.description,
    slug: req.body.slug,
    type: req.body.type,
    violonBody: req.body.violonBody,
    violonStick: req.body.violonStick,
    violonChincrest: req.body.violonChincrest,
    categories: req.body.categories,
    price: req.body.price,
    size: req.body.size,
    stockQuantity: req.body.stockQuantity,
    image: req.body.image,
    arModel: req.body.arModel,
    threeDModel: req.body.threeDModel,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    color: req.body.color,
    promo: req.body.promo,
    user:req.body.user,
  });

  try {
    const p1 = await prod.save();
    res.json(p1);
  } catch (err) {
    res.send("Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prod = await products.findById(req.params.id);
    res.json(prod);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const prod = await products.findByIdAndDelete(req.params.id);
    res.json(prod);
  } catch (err) {
    res.send("Error " + err);
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const prod = await products.findById(req.params.id);
    if (req.body.productName) prod.productName = req.body.productName;
    if (req.body.slug) prod.slug = req.body.slug;
    if (req.body.description) prod.description = req.body.description;
    if (req.body.categories) prod.categories = req.body.categories;
    if (req.body.price) prod.price = req.body.price;
    if (req.body.size) prod.size = req.body.size;
    if (req.body.stockQuantity) prod.stockQuantity = req.body.stockQuantity;
    if (req.body.image) prod.image = req.body.image;
    if (req.body.arModel) prod.arModel = req.body.arModel;
    if (req.body.threeDModel) prod.threeDModel = req.body.threeDModel;
    if (req.body.rating) prod.rating = req.body.rating;
    if (req.body.numReviews) prod.numReviews = req.body.numReviews;
    if (req.body.color) prod.color = req.body.color;
    if (req.body.promo) prod.promo = req.body.promo;

    await prod.save();
    res.json(prod);
  } catch (err) {
    res.send("Error " + err);
  }
});

const PAGE_SIZE = 3;
router.get("/search", async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const categories = query.categories || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter =
    categories && categories !== "all" ? { categories } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await products
    .find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await products.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/images/products");
  },
  filename: (req, file, callback) => {
    // const ext= file.mimetype.split('/')[1];
    console.log(req);
    callback(null, `${req.body.username}.jpg`);
  },
});
const uploadd = multer({
  storage: multerConfig,
});
const uploadImage = uploadd.single("photo");

 const upload = (req, res) => {
  res.status(200).json({
    succes: "success",
  });
}
router.post('/uploadImg',uploadImage,upload);


export default router;

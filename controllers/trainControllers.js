const asyncHandler = require("express-async-handler");
const trainModel = require("../models/trainModels");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

//get all trains
const getAllTrains = asyncHandler(async (req, res) => {
  const resultPerPage = 8;
  const trainsCount = await trainModel.countDocuments();
  const apifeatures = new ApiFeatures(trainModel.find(), req.query)
    .search()
    .filter();

  let trains = await apifeatures.query;

  let filteredtrainsCount = trains.length;

  apifeatures.pagination(resultPerPage);
  trains = await apifeatures.query.clone();

  res.status(200).json({
    success: true,
    trains,
    trainsCount,
    resultPerPage,
    filteredtrainsCount,
  });
});

//post  trains
const createTrains = asyncHandler(async (req, res) => {
  // const { name, category, numOfSeats, destination, startingCity,pricePerSeat } = req.body;
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const flattenedImages = [].concat(...images); // flatten the images array

  const imagesLinks = [];

  for (let i = 0; i < flattenedImages.length; i++) {
    const result = await cloudinary.v2.uploader.upload(flattenedImages[i], {
      folder: "train",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  const newTrain = await trainModel.create(req.body);
  res.status(201).json({
    message: "create  trains",
    newTrain,
    success: true,
  });
});

//get a single train
const getSingleTrain = asyncHandler(async (req, res) => {
  const train = await trainModel.findById(req.params.id);
  if (!train) {
    return new ErrorHandler("Train not found", 404);
  }
  res.status(200).json({
    success: true,
    train,
  });
});
//update train admin

const updateTrain = asyncHandler(async (req, res) => {
  let train = await trainModel.findById(req.params.id);
  if (!train) {
    return new ErrorHandler("train not found", 404);
  }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < train.images.length; i++) {
      await cloudinary.v2.uploader.destroy(train.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "trains",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  train = await trainModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModifiy: true,
  });
  res.status(200).json({
    success: true,
    train,
  });
});

//delete a train
const deleteTrain = asyncHandler(async (req, res) => {
  const trainExist = await trainModel.findById(req.params.id);
  if (!trainExist) {
    return new ErrorHandler("Train not found", 404);
  }
  await trainExist.remove();
  res.status(200).json({
    success: true,
  });
});

//create review
const createReview = asyncHandler(async (req, res, next) => {
  const { comment, ratings, trainId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    ratings: Number(ratings),
    comment,
  };
  const train = await trainModel.findById(trainId);
  const isReviewed = train.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    train.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    train.reviews.push(review);
    train.numOfReviews = train.reviews.length;
  }

  let avg = 0;

  train.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  train.ratings = avg / train.reviews.length;

  await train.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
const getAdminTrains = asyncHandler(async (req, res, next) => {
  const trains = await trainModel.find();

  res.status(200).json({
    success: true,
    trains,
  });
});

module.exports = {
  getAllTrains,
  createTrains,
  getSingleTrain,
  deleteTrain,
  updateTrain,
  getAdminTrains,
};

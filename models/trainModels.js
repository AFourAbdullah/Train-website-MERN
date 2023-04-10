const mongoose = require("mongoose");
const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter train Name"],
  },
  category: {
    type: String,
    required: [true, "Please Enter train category"],
  },
  numOfSeats: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  destination: {
    type: String,
    required: [true, "Please Enter train destination"],
  },
  pricePerSeat: {
    type: Number,
    default: 0,
  },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },

  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  startingCity: {
    type: String,
    required: [true, "Please Enter train starting city"],
  },
  departureTime: {
    type: String,
  },
  departureDay: {
    type: String,
  },
});

module.exports = mongoose.model("Trains", trainSchema);

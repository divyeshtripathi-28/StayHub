const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url:{
            type: String,
            set: (v) => v === ""? "https://i.pinimg.com/736x/b7/9b/50/b79b509be5e92bbc7fd5738b2aa4b0cf.jpg" : v,
            default: "https://i.pinimg.com/736x/b7/9b/50/b79b509be5e92bbc7fd5738b2aa4b0cf.jpg",
        },
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

module.exports = mongoose.model("Listing", listingSchema);
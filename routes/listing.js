const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner} = require("../middleware/middleware.js");
const {index, newForm, showListing, createListing, editForm, updateListing, deleteListing} = require("../controllers/listings.js");
const multer = require("multer");
const {storage, cloudinary} = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/listings", wrapAsync(index));

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        // throw new ExpressError(400, error);
        console.log(error);
        res.send(error);
    } else {
        next();
    }
}

//New route
router.get("/listing/new", isLoggedIn ,newForm);

//Create route
router.post("/listings",isLoggedIn, upload.single("listing[image][url]"), validateListing,  wrapAsync(createListing));

//Show route
router.get("/listing/:id", showListing);

router.get("/listing/:id/edit",isLoggedIn, isOwner, editForm);

router.put("/listing/:id",isLoggedIn, isOwner, upload.single("listing[image][url]"), validateListing, wrapAsync(updateListing));

router.delete("/listing/:id",isLoggedIn, isOwner, deleteListing);

module.exports = router;
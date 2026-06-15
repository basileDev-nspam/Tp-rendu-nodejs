import mongoose from "mongoose";


const TourSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'A tour must have a name'], unique: true, trim: true },
    duration: { type: Number, required: [true, 'A tour must have a duration'] },
    maxGroupSize: { type: Number, required: [true, 'A tour must have a maxGroup size'] },
    difficulty: { type: String, required: [true, 'A tour must have a difficulty'], enum: ['easy', 'medium', 'difficult', 'OSKOUR'] },
    ratingsAverage: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: Number,
    summary: { type: String, trim: true, required: [true, 'A tour must have a description'] },
    description: { type: String, trim: true },
    imageCover: {
        type: String,
        required: [true, 'A tour must have an image cover ']
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
})

const Tour = mongoose.model('Tour', TourSchema);

export { Tour }
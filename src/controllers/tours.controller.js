import { Router } from "express";
import { Tour } from "../models/tours.model.js"
import APIfeatures from "../utils/APIFeatures.js";
const router = Router()


const toursController = {
    getAllTours: async (req, res) => {
        
        // const tours = await new APIfeatures(Tour.find(), req.query).paginate().query.then()
        const tours = await Tour.find()
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: { tours }
        })
    },

    getTourByID: async (req, res) => {
        const tour = await Tour.findOne({ _id: req.params.tourId })
        if (!tour) {
            res.status(404).send(`Tour with id ${req.params['tourId']} does not exists`)
        }
        res.status(200).json(tour)
    },

    createTour: async (req, res) => {

        const newTour = new Tour({
            ...req.body
        })
        newTour.save()
            .then(() => res.status(201).json({ message: "Tour created" }))
            .catch((e) => res.status(400).json(e))
    },

    updateTour: async (req, res) => {
        const tour = await Tour.findOne({ _id: req.params.tourId })
        if (!tour) {
            res.status(404).send(`Tour with id ${req.params['tourId']} does not exists`)
        }
        const updatedTour = await Tour.findOneAndUpdate({_id: req.params.tourId}, req.body, {returnDocument: "after"})
        res.status(200).json(updatedTour);
    },

    deleteTour: async (req, res) => {
        await Tour.findOneAndDelete({_id: req.params.tourId });
        res.status(201).json({message: `Tour ID ${req.params.tourId} has been deleted`})
    }
}

export default toursController;
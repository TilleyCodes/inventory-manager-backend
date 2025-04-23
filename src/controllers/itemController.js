const { request } = require("http");
const Item = require("../models/itemModel.js");

// @desc Get all inventory items
// @route GET /items
const getAllItems = async (request, response) => {
    const items = await Item.find();
    response
    .status(200)
    .json(items);
};

// @desc Create a new item
// @route POST /items
const createItem = async (request, response) => {
    try {
        const { name, price, quantityInStock, category } = request.body;

        const newItem = await Item.create({
            name,
            price,
            quantityInStock,
            category
        });

        response
        .status(201)
        .json(newItem);
    } catch (err) {
        response
        .status(400)
        .json({ error: err.message});
    }
};

module.exports = {
    getAllItems,
    createItem
};

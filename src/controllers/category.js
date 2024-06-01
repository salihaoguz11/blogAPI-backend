"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

//Call Model:

const Category = require("../models/category");

// ------------------------------------------
// Category
// ------------------------------------------

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "List all categories"
      #swagger.responses[200] = {
        description: "Successful operation",
        schema: {
          error: false,
          count: 0,
          result: [],
        }
      }
    */
    const data = await res.getModelList(Category);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "Create a new category"
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Category data',
        required: true,
        schema: {
          name: "string",
        }
      }
      #swagger.responses[201] = {
        description: "Category created successfully",
        schema: {
          error: false,
          body: {},
          result: {},
        }
      }
    */
    const data = await Category.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ["Categories"]
      #swagger.summary = "Get category details"
      #swagger.parameters['categoryId'] = {
        in: 'path',
        description: 'Category ID',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: "Successful operation",
        schema: {
          error: false,
          result: {},
        }
      }
      #swagger.responses[404] = {
        description: "Category not found",
        schema: {
          error: true,
          message: "Category not found",
        }
      }
    */
    const data = await Category.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await Category.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidatiors: true }
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await Category.findOne({ _id: req.params.categoryId }),
    });
  },
  delete: async (req, res) => {
    const data = await Category.deleteOne({ _id: req.params.categoryId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// https://mongoosejs.com/docs/queries.html

// Catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

// Call Models:
const { Comment } = require("../models/commentModel");

// ------------------------------------------
// BlogCategory
// ------------------------------------------

module.exports.Comment = {
  list: async (req, res) => {
    /*
        // Searching & Sorting & Pagination:

        // SEARCHING: URL?search[key1]=value1&search[key2]=value2
        const search = req.query?.search || {}
        // console.log(search)
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        for (let key in search) search[key] = { $regex: search[key], $options: 'i' } // i: case Insensitive
        // console.log(search)

        // Cancelled -> SORTING: URL?sort[key1]=1&sort[key2]=-1 (1:ASC, -1:DESC)
        // Mongoose=^8.0 -> SORTING: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
        const sort = req.query?.sort || {}
        // console.log(sort)

        // PAGINATION: URL?page=1&limit=10
        // const limit = req.query?.limit || 20
        // let limit = req.query?.limit || (process.env?.PAGE_SIZE || 20)
        // limit = Number(limit)
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
        // console.log('limit', typeof limit, limit)

        let page = Number(req.query?.page)
        page = (page > 0 ? page : 1) - 1 // Backend'de sayfaNo her zaman -1'dir.
        // console.log('page', typeof page, page)

        let skip = Number(req.query?.skip) // İstenirse url'de ?skip=10 gibi değer gönderilebilir.
        skip = skip > 0 ? skip : (page * limit)
        // console.log('skip', typeof skip, skip)

        // RUN:
        // const data = await Comment.find().populate('blogCategoryId') // get Primary Data
        const data = await Comment.find(search).sort(sort).skip(skip).limit(limit).populate('blogCategoryId')
        */

    const data = await res.getModelList(Comment, "userId");

    res.status(200).send({
      error: false,
      count: data.length,
      details: await res.getModelListDetails(Comment),
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    // const data = await Comment.create({
    //     fieldName: 'value',
    //     fieldName: 'value',
    //     fieldName: 'value',
    // })
    const data = await Comment.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    // req.params.postId
    // const data = await Comment.findById(req.params.postId)
    const data = await Comment.findOne({ _id: req.params.postId }).populate(
      "blogId"
    ); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await Comment.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data
    const data = await Comment.updateOne({ _id: req.params.postId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await Comment.findOne({ _id: req.params.postId }),
    });
  },

  delete: async (req, res) => {
    const data = await Comment.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

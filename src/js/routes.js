const express = require('express');
const SQLQueries = require('./SQLQueries');
const debug = require('debug')('routes');

const bookRouter = express.Router();

function routes() {

  //Get All Post
  bookRouter.route('/').get((req, res) => {
    SQLQueries.getAllPosts(({ recordset }) => {
      res.send(recordset);
    })
  })

  //Post NewPost
  bookRouter.route('/newpost').post((req, res) => {
    SQLQueries.insertNewPost(
      {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
      },
      (result) => {
        debug(result);
        res.status(200).send({"message":"data received"});
      }
    )
  })

  //Get ViewPost
  bookRouter.route('/viewpost/:id').get((req, res) => {
    SQLQueries.getPost(req.params.id, (result) => {
      res.send(result.recordset[0]);
    }
    )
  })


  //Post edit
  bookRouter.route('/editpost').post((req, res) => {
    SQLQueries.editPost(
      {
        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
      },
      (result) => {
        debug(result);
        res.status(200).send({"message":"data Edited"});
      }
    )
  })

  //Get DeletePost
  bookRouter.route('/deletepost/:id').get((req, res) => {
    SQLQueries.deletePost(
      req.params.id,
      (result) => {
        debug(result);
        res.status(200).send({"message":"data Deleted"});
      }

    )
  })

  bookRouter.route('/likepost/:id').get((req, res) => {
    SQLQueries.likePost(
      req.params.id,
      (result) => {
        debug(result);
        res.status(200).send({"message":"Post Liked"});
      }

    )
  })

  return bookRouter;
}

module.exports = routes;

const express = require("express");

// const { body, validationResult } = require('express-validator');

const postInformationHandler = require("../middlewares/informationHandler");
const userRouter = express.Router();

const {
    get_all_users, get_user_by_id, 
    create_new_user, 
    create_new_user_by_parameter, 
    update_specific_user,
    delete_movie_by_id
  } = require("../controllers/users");

userRouter
  .route("/")
  .get(get_all_users).post(postInformationHandler, create_new_user);

userRouter
  .route("/:id")
  .get(get_user_by_id);

userRouter
  .route("/users/:id")
  .put(postInformationHandler, update_specific_user)
  .delete(delete_movie_by_id);

userRouter
  .route("/:first_name&:last_name")
  .post(create_new_user_by_parameter);

// userRouter
//   .route("/:first_name|:last_name")
//   .post(create_new_user_by_parameter);

// userRouter
// .route("/:first_name|:last_name")
// .put(update_specific_user);



module.exports = userRouter;

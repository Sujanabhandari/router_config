
//this controller when user ask for the data , 
//It ask  the database about the specific data


const db = require("../database/client");

const get_all_users= async (req, res, next) => {
  // const { rows: movies }
  try {
    const { rows } = await db.query("SELECT * from users;");
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const  get_user_by_id= async (req, res, next) => {
    const { id } = req.params;

    try {
      const { rows:[user], rowCount } = await db.query(`SELECT * FROM users WHERE id=$1;`,[id]);
      
      //if there is no user with the id, return 404
      if(!rowCount) return res.status(404).send(`The movie with id ${id} does not exist`);
      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };


  const  create_new_user= async (req, res, next) => {

    const {first_name, last_name, age } = req.body;

   
    // if(!first_name || !last_name || !age) return res.status(400).send("The request body must have values for first_name, last_name, age");

    try {
      const { rows:[createdUser] } = await db.query(`INSERT INTO users (first_name, last_name, age)
      VALUES($1, $2, $3) RETURNING *`,[first_name, last_name, age]);
       
      return res.status(201).send(createdUser);
      
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
 
  const  create_new_user_by_parameter= async (req, res, next) => {
    // const {first_name, last_name, age } = req.params;
    const { first_name, last_name} =req.params;
    try {
      const { rows:[createdUser] } = await db.query(`INSERT INTO users (first_name, last_name)
      VALUES($1, $2) RETURNING *`,[first_name, last_name]);
       
      return res.status(201).send(createdUser);
      
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  const update_specific_user = async (req, res, next) => {
    const { id } = req.params;
    const { first_name, last_name, age} =req.body;
    try {
      const {
        rowCount,
        rows: [updateSpecificUser],
      } = await db.query(
        "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *",
        [first_name, last_name,age,id])
      ;
  
      // inform the user if they try to update a movie that does not exist
      if (!rowCount)
        return res
          .status(404)
          .send(
            `The movie with id ${id} that you are trying to update does not exist`
          );
  
      return res.status(201).send(updateSpecificUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  
const delete_movie_by_id = async (req, res, next) => {
  const { id } = req.params;

  try {
    const {
      rows: [deletedUser],
      rowCount,
    } = await db.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);

    // inform the user if they try to delete a movie that does not exist
    if (!rowCount)
      return res
        .status(404)
        .send(
          `The movie with id ${id} that you are trying to delete does not exist`
        );

    return res.status(200).send(deletedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
 
module.exports = {
  get_all_users,
  get_user_by_id,
  create_new_user,
  create_new_user_by_parameter,
  update_specific_user,
  delete_movie_by_id
};
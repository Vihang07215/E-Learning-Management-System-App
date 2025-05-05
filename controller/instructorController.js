const ErrorHandler = require("../utils/default/errorHandler");
const { v4: uuidv4 } = require("uuid");

exports.Create = async (req, res, next) => {
  const { email, first_name, last_name, username } = req.body;
  const pool = req.pool;
  let var_instructor_List;
  try {
    const [rows] = await pool.query(
      `SELECT email FROM instructor WHERE email = ? `,
      [email]
    );
    var_instructor_List = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting instructor record!",
      400
    );
    return next(error);
  }
  if (var_instructor_List) {
    const error = new ErrorHandler(
      "Instructor with this email already exists !",
      400
    );
    return next(error);
  } else {
  }
  genUUID = uuidv4();
  let createdinstructor;
  try {
    let [results] = await pool.query(
      `INSERT INTO instructor(first_name, last_name, instructor_id, email, username) VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, genUUID, email, username]
    );
    // Retrieve the newly created instructor
    const [rows] = await pool.query(
      `SELECT * FROM instructor WHERE instructor_id = ?`,
      [genUUID]
    );
    createdinstructor = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Inserting instructor record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: createdinstructor });
};

exports.Delete = async (req, res, next) => {
  const { instructor_id } = req.params;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM instructor  WHERE instructor_id = ? `, [
      instructor_id,
    ]);
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Deleting instructor record!",
      200
    );
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.Get = async (req, res, next) => {
  const { instructor_id } = req.params;
  const pool = req.pool;
  let selectedinstructor;
  try {
    const [rows] = await pool.query(
      `SELECT email, username, instructor_id, first_name, last_name FROM instructor WHERE instructor_id = ? `,
      [instructor_id]
    );
    selectedinstructor = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting instructor record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: selectedinstructor });
};

exports.Update = async (req, res, next) => {
  const { email, first_name, last_name, username } = req.body;
  const { instructor_id } = req.params;
  const pool = req.pool;
  let updatedinstructor;
  try {
    await pool.query(
      `UPDATE instructor SET last_name = ?, username = ?, first_name = ?, email = ? WHERE instructor_id = ? `,
      [last_name, username, first_name, email, instructor_id]
    );
    const [rows] = await pool.query(
      `SELECT * FROM instructor WHERE instructor_id = ? `,
      [instructor_id]
    );
    updatedinstructor = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Updating instructor record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updatedinstructor });
};

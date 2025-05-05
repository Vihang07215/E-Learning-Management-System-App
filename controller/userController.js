const ErrorHandler = require("../utils/default/errorHandler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const {sendmail} = require("../utils/sendmail");

exports.Create = async (req, res, next) => {
  const { email, password, type, username, first_name, last_name } = req.body;
  const pool = req.pool;
  let var_user_List;
  try {
    const [rows] = await pool.query(`SELECT email FROM user WHERE email = ? `, [
      email,
    ]);
    var_user_List = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while geting user with this email !",
      400
    );
    return next(error);
  }
  if (var_user_List) {
    const error = new ErrorHandler(
      "User with this email already exists !",
      400
    );
    return next(error);
  } else {
  }
  genUUID = uuidv4();
  Hashed_Pasword = await bcrypt.hash(password, 10);
  let createduser;
  try {
    let [results] = await pool.query(
      `INSERT INTO user(password, first_name, username, type, email, user_id, last_name) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Hashed_Pasword, first_name, username, type, email, genUUID, last_name]
    );
    // Retrieve the newly created user
    const [rows] = await pool.query(`SELECT * FROM user WHERE user_id = ?`, [
      genUUID,
    ]);
    createduser = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Inserting user record!", 500);
    return next(error);
  }
  if (createduser.type == "Student") {
    let createdstudent;
    let [results] = await pool.query(
      `INSERT INTO student(last_name, username, student_id, first_name, email) VALUES (?, ?, ?, ?, ?)`,
      [
        createduser.last_name,
        createduser.username,
        createduser.user_id,
        createduser.first_name,
        createduser.email,
      ]
    );
    // Retrieve the newly created student
    const [rows] = await pool.query(
      `SELECT * FROM student WHERE student_id = ?`,
      [createduser.user_id]
    );
    createdstudent = rows[0];
  } else {
    let createdinstructor;
    let [results] = await pool.query(
      `INSERT INTO instructor(last_name, first_name, email, username, instructor_id) VALUES (?, ?, ?, ?, ?)`,
      [
        createduser.last_name,
        createduser.first_name,
        createduser.email,
        createduser.username,
        createduser.user_id,
      ]
    );
    // Retrieve the newly created instructor
    const [rows] = await pool.query(
      `SELECT * FROM instructor WHERE instructor_id = ?`,
      [createduser.user_id]
    );
    createdinstructor = rows[0];
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: createduser });
};

exports.Delete = async (req, res, next) => {
  const { user_id } = req.params;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM user  WHERE user_id = ? `, [user_id]);
  } catch (err) {
    const error = new ErrorHandler("Error while Deleting user record!", 200);
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.Get = async (req, res, next) => {
  const { user_id } = req.params;
  const pool = req.pool;
  let selecteduser;
  try {
    const [rows] = await pool.query(
      `SELECT user_id, username, type, first_name, email, password, last_name FROM user WHERE user_id = ? `,
      [user_id]
    );
    selecteduser = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Selecting user record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: selecteduser });
};

exports.loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const pool = req.pool;
  let var_user_List;
  try {
    const [rows] = await pool.query(
      `SELECT email, password FROM user WHERE email = ? `,
      [email]
    );
    var_user_List = rows[0];
  } catch (err) {
    const error = new ErrorHandler("user with this email not exists", 500);
    return next(error);
  }
  if (var_user_List) {
    let validatepassword = false;
    try {
      validatepassword = await bcrypt.compare(password, var_user_List.password);
    } catch (err) {
      const error = new ErrorHandler("Error while validating password !", 500);
      return next(error);
    }
    if (validatepassword) {
      res.json("Login Successfully !");
      await sendmail(email,"Login Message","Your Login Successfully !" );
    } else {
    }
  } else {
  }
};

exports.Update = async (req, res, next) => {
  const { email, password, type, username, first_name, last_name } = req.body;
  const { user_id } = req.params;
  const pool = req.pool;
  let updateduser;
  try {
    await pool.query(
      `UPDATE user SET last_name = ?, password = ?, first_name = ?, type = ?, username = ?, email = ? WHERE user_id = ? `,
      [last_name, password, first_name, type, username, email, user_id]
    );
    const [rows] = await pool.query(`SELECT * FROM user WHERE user_id = ? `, [
      user_id,
    ]);
    updateduser = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Updating user record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updateduser });
};

const ErrorHandler = require("../utils/default/errorHandler");
const { v4: uuidv4 } = require("uuid");

exports.Create = async (req, res, next) => {
  const { classs, email, first_name, last_name, username } = req.body;
  const pool = req.pool;
  let var_student_List;

  const [rows] = await pool.query(
    `SELECT email FROM student WHERE email = ? `,
    [email]
  );
  var_student_List = rows[0];
  if (var_student_List) {
    const error = new ErrorHandler(
      "Student with this email already exists !",
      400
    );
    return next(error);
  } else {
  }
  genUUID = uuidv4();
  let createdstudent;
  try {
    let [results] = await pool.query(
      `INSERT INTO student(first_name, student_id, last_name, email, username, classs) VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, genUUID, last_name, email, username, classs]
    );
    // Retrieve the newly created student
    const [rows] = await pool.query(
      `SELECT * FROM student WHERE student_id = ?`,
      [genUUID]
    );
    createdstudent = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Inserting student record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: createdstudent });
};

exports.Delete = async (req, res, next) => {
  const { student_id } = req.params;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM student  WHERE student_id = ? `, [
      student_id,
    ]);
  } catch (err) {
    const error = new ErrorHandler("Error while Deleting student record!", 200);
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.Get = async (req, res, next) => {
  const { student_id } = req.params;
  const pool = req.pool;
  let selectedstudent;
  try {
    const [rows] = await pool.query(
      `SELECT email, first_name, student_id, username, classs, last_name FROM student WHERE student_id = ? `,
      [student_id]
    );
    selectedstudent = rows[0];
  } catch (err) {
    const error = new ErrorHandler(
      "Error while Selecting student record!",
      500
    );
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: selectedstudent });
};

exports.Update = async (req, res, next) => {
  const { classs, email, first_name, last_name, username } = req.body;
  const { student_id } = req.params;
  const pool = req.pool;
  let updatedstudent;
  try {
    await pool.query(
      `UPDATE student SET username = ?, last_name = ?, classs = ?, email = ?, first_name = ? WHERE student_id = ? `,
      [username, last_name, classs, email, first_name, student_id]
    );
    const [rows] = await pool.query(
      `SELECT * FROM student WHERE student_id = ? `,
      [student_id]
    );
    updatedstudent = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Updating student record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updatedstudent });
};

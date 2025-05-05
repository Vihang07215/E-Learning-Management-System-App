const { v4: uuidv4 } = require("uuid");
const ErrorHandler = require("../utils/default/errorHandler");

exports.Create = async (req, res, next) => {
  const {
    description,
    img_url,
    instructor,
    lesson_body,
    lesson_number,
    lesson_title,
    title,
  } = req.body;
  const pool = req.pool;
  genUUID = uuidv4();
  let createdclass;
  try {
    let [results] = await pool.query(
      `INSERT INTO class(lesson_number, lesson_title, description, title, instructor, lesson_body, img_url, class_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lesson_number,
        lesson_title,
        description,
        title,
        instructor,
        lesson_body,
        img_url,
        genUUID,
      ]
    );
    // Retrieve the newly created class
    const [rows] = await pool.query(`SELECT * FROM class WHERE class_id = ?`, [
      genUUID,
    ]);
    createdclass = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Inserting class record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: createdclass });
};

exports.Delete = async (req, res, next) => {
  const { class_id } = req.params;
  const pool = req.pool;
  try {
    await pool.query(`DELETE FROM class  WHERE class_id = ? `, [class_id]);
  } catch (err) {
    const error = new ErrorHandler("Error while Deleting class record!", 200);
    return next(error);
  }
  res.status(200);
  res.json({ Status: "20", Message: "Success" });
};

exports.Get = async (req, res, next) => {
  const { class_id } = req.params;
  const pool = req.pool;
  let selectedclass;
  try {
    const [rows] = await pool.query(
      `SELECT lesson_number, img_url, description, lesson_title, title, instructor, lesson_body, class_id FROM class WHERE class_id = ? `,
      [class_id]
    );
    selectedclass = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Selecting class record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: selectedclass });
};

exports.getAllClasss = async (req, res, next) => {
  const pool = req.pool;
  let var_class_List;
  try {
    const [rows] = await pool.query(
      `SELECT instructor, lesson_number, lesson_body, img_url, description, title, lesson_title, class_id FROM class`
    );
    var_class_List = rows;
  } catch (err) {
    const error = new ErrorHandler("Error while Selecting class record!", 400);
    return next(error);
  }
  res.status(200);
  res.json({ data: var_class_List });
};

exports.Update = async (req, res, next) => {
  const {
    description,
    img_url,
    instructor,
    lesson_body,
    lesson_number,
    lesson_title,
    title,
  } = req.body;
  const { class_id } = req.params;
  const pool = req.pool;
  let updatedclass;
  try {
    await pool.query(
      `UPDATE class SET img_url = ?, lesson_title = ?, description = ?, title = ?, lesson_body = ?, instructor = ?, lesson_number = ? WHERE class_id = ? `,
      [
        img_url,
        lesson_title,
        description,
        title,
        lesson_body,
        instructor,
        lesson_number,
        class_id,
      ]
    );
    const [rows] = await pool.query(`SELECT * FROM class WHERE class_id = ? `, [
      class_id,
    ]);
    updatedclass = rows[0];
  } catch (err) {
    const error = new ErrorHandler("Error while Updating class record!", 500);
    return next(error);
  }
  res.status(201);
  res.json({ Status: "201", Message: "Success", data: updatedclass });
};

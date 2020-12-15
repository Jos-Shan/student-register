//intitialize express router
let router = require('express').Router();

//import controllers
let { createStudent, fetchAllStudents, deleteStudent, updateStudent } = require("../controllers/studentControllers");

//routes for student
router.get("/", fetchAllStudents);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

//export API routes
module.exports = router;
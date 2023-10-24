const express = require('express')
const { body } = require('express-validator')

const router = express.Router()
const coursesController = require('../controllers/courses.controller')
const { validationSchema } = require('../middlewares/validationschema')
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middlewares/allowedTo');


router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken, allowedTo(userRoles.MANGER), validationSchema(), coursesController.addCourse)

router.route('/:courseId')
    .get(coursesController.getSingleCourse)
    .patch(coursesController.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), coursesController.deleteCourse)


module.exports = router;
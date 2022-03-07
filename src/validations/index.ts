import { body } from "express-validator";

export const employeeValidation = [
  body("first_name").not().isEmpty().withMessage("First name required"),
  body("last_name").not().isEmpty().withMessage("Last name required"),
  body("job_title").not().isEmpty().withMessage("Job title required"),
  body("department").not().isEmpty().withMessage("Department required"),
  body("location")
    .not()
    .isEmpty()
    .withMessage("Location required")
    .isLength({ max: 2 })
    .withMessage("Length must be 2"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"),
  body("start_date")
    .not()
    .isEmpty()
    .withMessage("Start date required")
    .isISO8601()
    .withMessage("Invalid Date"),
];

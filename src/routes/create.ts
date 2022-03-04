import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { Employee } from "../model/employee";
import { employeeValidation } from "../validations";

const router = express.Router();

router.post(
  "/api/add-employee",
  employeeValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const employeeInfo = req.body;

    const newEmployee = await Employee.create({
      ...employeeInfo,
    });

    await newEmployee.save();

    res.status(201).send(newEmployee);
  }
);

export { router as addEmployeeRouter };

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { validateRequest } from "../middlewares/validate-request";
import { Employee } from "../model/employee";
import { employeeValidation } from "../validations";

const router = express.Router();

router.patch(
  "/api/employees/:id",
  employeeValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeInfo = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ message: "Not found" });
    }

    const updatedEmployee = { ...employeeInfo };

    await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });

    res.status(201).send(updatedEmployee);
  }
);

export { router as updateEmployeeRouter };

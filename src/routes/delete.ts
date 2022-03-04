import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Employee } from "../model/employee";

const router = express.Router();

router.delete("/api/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).send({ message: "Not found" });
  }

  await Employee.findByIdAndRemove(id);

  res.status(202).send({ message: "Employee successfully deleted" });
});

export { router as deleteEmployeeRouter };

import express, { Request, Response } from "express";
import { Employee } from "../model/employee";

const router = express.Router();

router.get("/api/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).send({ message: "Not found" });
  }

  res.status(200).send(employee);
});

export { router as fetchEmployeeRouter };

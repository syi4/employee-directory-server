import express, { Request, Response } from "express";
import { Employee } from "../model/employee";

const router = express.Router();

router.get("/api/employees", async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const NUMBER_PAGE = Number(page);
    const LIMIT = 5;
    const SKIP = (NUMBER_PAGE - 1) * LIMIT;

    const totalEmployees = await Employee.countDocuments({});

    const LAST_PAGE = totalEmployees / LIMIT;

    const employees = await Employee.find()
      .sort({ start_date: 1 })
      .limit(LIMIT)
      .skip(SKIP);

    const next = NUMBER_PAGE === LAST_PAGE ? null : `page ${NUMBER_PAGE + 1}`;
    const prev = NUMBER_PAGE === 1 ? null : `page ${NUMBER_PAGE - 1}`;
    const results = employees;

    res.send({ results, next, prev });
  } catch (err) {
    res.sendStatus(400);
  }
});

export { router as fetchEmployeesRouter };

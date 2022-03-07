import express, { Request, Response } from "express";
import { Employee } from "../model/employee";

const router = express.Router();

router.get("/api/employees", async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const NUMBER_PAGE = Number(page);
    const LIMIT = 7;
    const SKIP = (NUMBER_PAGE - 1) * LIMIT;

    const totalEmployees = await Employee.countDocuments({});

    const TOTAL_PAGES = Math.ceil(totalEmployees / LIMIT);

    const employees = await Employee.find()
      .sort({ start_date: 1 })
      .limit(LIMIT)
      .skip(SKIP);

    const next = NUMBER_PAGE === TOTAL_PAGES ? null : `page ${NUMBER_PAGE + 1}`;
    const prev = NUMBER_PAGE === 1 ? null : `page ${NUMBER_PAGE - 1}`;
    const total_pages = TOTAL_PAGES;
    const results = employees;

    res.send({ results, next, prev, total_pages });
  } catch (err) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

export { router as fetchEmployeesRouter };

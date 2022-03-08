import express, { Request, Response } from "express";
import cors from "cors";
import { healthCheckRouter } from "./routes/healthcheck";
import { fetchEmployeesRouter } from "./routes/fetch-all";
import { addEmployeeRouter } from "./routes/create";
import { updateEmployeeRouter } from "./routes/update";
import { fetchEmployeeRouter } from "./routes/fetch-one";
import { deleteEmployeeRouter } from "./routes/delete";
import { searchEmployeeRouter } from "./routes/search";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(healthCheckRouter);
app.use(fetchEmployeesRouter);
app.use(fetchEmployeeRouter);
app.use(addEmployeeRouter);
app.use(updateEmployeeRouter);
app.use(deleteEmployeeRouter);
app.use(searchEmployeeRouter);

app.all("*", async (req: Request, res: Response) => {
  res.status(404).send({ message: "Not Found" });
});

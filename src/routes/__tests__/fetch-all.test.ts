import request from "supertest";
import { app } from "../../app";

const addEmployee = () => {
  return request(app).post("/api/add-employee").send({
    first_name: "Bob",
    last_name: "Dole",
    picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
    job_title: "Cop",
    department: "Police",
    location: "FL",
    email: "Bob@email.com",
    start_date: "2016-01-01",
  });
};

it("fetches the limit amount of employees", async () => {
  await addEmployee();
  await addEmployee();
  await addEmployee();
  await addEmployee();
  await addEmployee();
  await addEmployee();

  const response = await request(app).get("/api/employees").send().expect(200);

  expect(response.body.results.length).toEqual(5);
});

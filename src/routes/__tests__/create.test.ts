import request from "supertest";
import { app } from "../../app";

it("returns an error if an invalid email is provided", async () => {
  await request(app)
    .post("/api/add-employee")
    .send({
      first_name: "Bob",
      last_name: "Dole",
      picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
      job_title: "Cop",
      department: "Police",
      location: "FL",
      email: "BobDolecom",
      start_date: "2016-01-01",
    })
    .expect(400);
});

it("returns an error if an invalid date is provided", async () => {
  await request(app)
    .post("/api/add-employee")
    .send({
      first_name: "Bob",
      last_name: "Dole",
      picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
      job_title: "Cop",
      department: "Police",
      location: "FL",
      email: "Bob@email.com",
      start_date: "2016/01/01",
    })
    .expect(400);
});

it("returns an error if an input is empty", async () => {
  await request(app)
    .post("/api/add-employee")
    .send({
      last_name: "Dole",
      picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
      job_title: "Cop",
      department: "Police",
      location: "FL",
      email: "Bob@email.com",
      start_date: "2016-01-01",
    })
    .expect(400);
});

it("adds an employee with valid inputs", async () => {
  await request(app)
    .post("/api/add-employee")
    .send({
      first_name: "Bob",
      last_name: "Dole",
      picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
      job_title: "Cop",
      department: "Police",
      location: "FL",
      email: "Bob@email.com",
      start_date: "2016-01-01",
    })
    .expect(201);
});

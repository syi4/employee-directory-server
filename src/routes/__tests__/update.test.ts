import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const mockEmployeeInfo = {
  first_name: "Bob",
  last_name: "Dole",
  picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
  job_title: "Cop",
  department: "Police",
  location: "FL",
  email: "Bob@email.com",
  start_date: "2016-01-01",
};

it("returns a 404 if the provided id does not exist", async () => {
  const mockId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/api/employees/${mockId}`)
    .send(mockEmployeeInfo)
    .expect(404);
});

it("returns a 400 if the start date or email inputs are invalid", async () => {
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

it("updates an employee given valid inputs", async () => {
  const response = await request(app)
    .post("/api/add-employee")
    .send(mockEmployeeInfo);

  await request(app)
    .patch(`/api/employees/${response.body.id}`)
    .send({
      first_name: "Kim",
      last_name: "Jane",
      picture: "https://randomuser.me/api/portraits/med/women/75.jpg",
      job_title: "Nurse",
      department: "Hospital",
      location: "NY",
      email: "Kim@email.com",
      start_date: "2016-02-02",
    })
    .expect(201);

  const employeeResponse = await request(app)
    .get(`/api/employees/${response.body.id}`)
    .send();

  expect(employeeResponse.body.first_name).toEqual("Kim");
  expect(employeeResponse.body.last_name).toEqual("Jane");
  expect(employeeResponse.body.picture).toEqual(
    "https://randomuser.me/api/portraits/med/women/75.jpg"
  );
  expect(employeeResponse.body.job_title).toEqual("Nurse");
  expect(employeeResponse.body.department).toEqual("Hospital");
  expect(employeeResponse.body.location).toEqual("NY");
  expect(employeeResponse.body.email).toEqual("Kim@email.com");
  expect(employeeResponse.body.start_date).toEqual("2016-02-02");
});

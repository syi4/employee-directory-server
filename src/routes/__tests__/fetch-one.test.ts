import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

const mockId = new mongoose.Types.ObjectId().toHexString();

const addEmployee = () => {
  return request(app).post("/api/add-employee").send({
    _id: mockId,
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

it("returns a 404 if the provided id does not exist", async () => {
  await request(app).get(`/api/employees/${mockId}`).send().expect(404);
});

it("successfully fetches an employee", async () => {
  await addEmployee();

  await request(app).get(`/api/employees/${mockId}`).send().expect(200);
});

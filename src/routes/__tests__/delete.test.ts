import request from "supertest";
import mongoose from "mongoose";
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

it("successfully deletes an employee", async () => {
  await addEmployee();

  const response = await request(app)
    .delete(`/api/employees/${mockId}`)
    .send()
    .expect(202);

  expect(response.body.message).toEqual("Employee successfully deleted");
});

it("returns a 404 if the provided id does not exist", async () => {
  await request(app).delete(`/api/employees/${mockId}`).send().expect(404);
});

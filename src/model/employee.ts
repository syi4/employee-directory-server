import mongoose from "mongoose";

interface EmployeeDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  picture: string;
  job_title: string;
  department: string;
  location: string;
  email: string;
  start_date: string;
}

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    picture: { type: String, required: true },
    job_title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    start_date: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Employee = mongoose.model<EmployeeDocument>("Employee", employeeSchema);

export { Employee };

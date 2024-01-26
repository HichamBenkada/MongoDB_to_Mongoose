import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.ATLAS_URI);
// Check for successful connection
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
  console.log("Connected to Gradesdb");
});
mongoose.connect(process.env.ATLAS_URI);

//parsing middleware
app.use(express.json());

import grades from './routes/grades.mjs'
//redirect to grades route
app.use('/grades', grades)


app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})
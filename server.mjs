import express from 'express';
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 5050;

//parsing middleware
app.use(express.json());

import grades from './routes/grades.mjs'
//BaseURL Hostdomain/grades
app.use('/grades', grades)


app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})
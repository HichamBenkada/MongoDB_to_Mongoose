import express from 'express';
import "dotenv/config";
import grades from './routes/grades.mjs'
const PORT = process.env.PORT || 5050;
const app = express();

//parsing middleware
app.use(express.json());

//BaseURL Hostdomain/grades
app.use('/grades', grades)


app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})
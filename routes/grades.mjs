import express from 'express';
import {ObjectId} from 'mongodb'
import db from '../db/conn.mjs'
const router = express.Router();

//grades baseURL
router.route("/")

router
    .get('/:id', async (req,res)=>{
        let collection = await db.collection('grades')

        let query = {
            _id: new ObjectId(req.params.id) 
        }
        // get result from database
        let result = await collection.findOne(query)

        if(!result) res.send('Not Found').status(404);
        else res.send(result).status(200);
    })

// grades of a student: Route compatibility
router.get('/student/:id' , (req,res)=>{
res.redirect(`learner/${req.params.id}`)
})
// grades of a student:
router.get('/learner/:id' , async (req,res)=>{
    let collection = await db.collection('grades')

    let query = {
        learner_id: Number(req.params.id)
    };
    // get result from database
    let result = await collection.find(query).toArray();

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
});

router.get('/class/:id' , async (req,res)=>{
    let collection = await db.collection('grades')

    let query = {
        class_id: Number(req.params.id)
    };
    // get result from database
    let result = await collection.find(query).toArray();

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
});

//create a single grade entry
router.post('/' ,  async (req,res) =>{
 let collection = db.collection('grades');

 let newDocument = req.body;

if(newDocument.hasOwnProperty("student_id")){
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
}
let result = await collection.insertOne(newDocument);
if(!result) res.send("Not Found").status(404);
else res.send(result).status(200); 
})

//Update a score 
router.patch('/:id/add', async (req,res)=>{

let collection = await db.collection.

});

//delete single entry
router.delete('/:id', async (req,res)=>{
    let collection = await db.collection('grades')

    let query = {
        _id: new ObjectId(req.params.id) 
    }
    // get result from database
    let result = await collection.deleteOne(query)

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
})



export default router;

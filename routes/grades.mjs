import express from "express";
import mongoose from "mongoose";
import Grade from "../models/grades.mjs";

const router = express.Router();


//BASE URL: http://localhost:5050/grades/

/*  "/grades" routes    */
// get 10 grade entries
router.get("/", async (req, res) => {
  // return 10 random grades from db 
  try {
    const result = await Grade.find({}).limit(10).exec();
    // console.log(result);//checked
    if(result) res.send(result).status(200)
    else throw "Failled to access DB"
  } catch (error) {
    console.error(error)
  }
})

// Create a single grade entry
router.post("/", async (req, res) => {
  //creating a grade using Grade module:
  let newDocument = new Grade();
  newDocument.scores = req.body.scores;
  newDocument.class_id = req.body.class_id
  // rename fields for backwards compatibility
  newDocument.learner_id = req.body.student_id || req.body.learner_id;
  
  let result = await newDocument.save();
  if (!result) res.send("Bad Request").status(400);
  else res.send(result).status(200);
});

//Get a single grade entry
router.get("/:id", async (req, res) => {
  let result = await Grade.findById(req.params.id).exec();

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  
  let result = await Grade.updateOne({_id: req.params.id}, {
    $push: { scores: req.body },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  let collection = req.grades;
  let query = { _id: req.params.id };

  let result = await Grade.updateOne(query, {
    $pull: { scores: req.body },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  let query = { _id: req.params.id };
  let result = await Grade.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

/*    "/grades/learner" routes    */
// These are routes that interact with grade entries based on learner_id
////////////////////////////////////////////
// Get route for backwards compatibility
router.get("/student/:id", (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// Get a students grade data
router.get("/learner/:id", async (req, res) => {
  let query = { learner_id: Number(req.params.id) };

  let result = await Grade.find(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  let query = { learner_id: Number(req.params.id) };

  let result = await Grade.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
// ////////////////////////////////////////////

/*    "/grades/class" routes    */
// These are routes that interact with grade entries based on class_id
////////////////////////////////////////////
// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };
  let result = await Grade.find(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grade.updateMany(query, {
    $set: { class_id: req.body.class_id },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grade.deleteMany(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
////////////////////////////////////////////

export default router;

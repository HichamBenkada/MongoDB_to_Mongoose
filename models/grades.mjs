import mongoose from 'mongoose'

const gradesSchema = new mongoose.Schema({
scores: [{
  type: {
    type:String,
    enums:["exam","quiz","homework"],
    message:"{VALUE} is not a valide score type",
  },
  score: Number,
}],
class_id:{
  type: Number,
  max:700
},
learner_id:{
  type: Number,
  min: 0
}
});

export default mongoose.model('Grade', gradesSchema)
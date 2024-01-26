import mongoose from 'mongoose';

const gradesSchema = new mongoose.Schema({
scores: [{
  type: {
    type:String,
    enums:["exam","quiz","homework"],
    message:"{VALUE} is not a valide score type! try exam,quiz or homework",
  },
  score: Number,
}],
class_id:{
  type: Number,
  max:700,
  required:true
},
learner_id:{
  type: Number,
  min: 0,
  required:true,
}
});

export default mongoose.model('Grade', gradesSchema)
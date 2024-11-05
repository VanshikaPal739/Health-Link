const { Schema, model } = require('../connection');

// Define the LabTest schema
const mySchema = new Schema({

  name: {type: String,required: true,trim: true},
  description: {type: String,required: true,trim: true},
  price: {type: Number,required: true},
  reportTime: {type: String,required: true},
  healthConcerns: [{type: String,required: true,}],
  testsIncluded: {type:String} // Array of strings for multiple testsdefault: [],
});

module.exports = model('Labtest', mySchema);


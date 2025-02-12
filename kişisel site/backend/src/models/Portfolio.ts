import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  githubLink: {
    type: String,
    required: false
  },
  technologies: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Portfolio', portfolioSchema); 
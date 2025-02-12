import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  image: String,
  skills: {
    frontend: [String],
    backend: [String],
    tools: [String]
  },
  experiences: [{
    title: String,
    company: String,
    period: String,
    description: String
  }],
  contact: {
    email: String,
    github: String,
    linkedin: String,
    customLinks: [{
      id: String,
      icon: String,
      url: String
    }],
    socialLinks: [{
      id: String,
      icon: String,
      url: String
    }]
  }
});

export default mongoose.model('Hakkimda', aboutSchema); 
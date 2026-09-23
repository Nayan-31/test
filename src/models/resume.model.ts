import mongoose from "mongoose";
import { IResume } from "../types/resume.types";

const ResumeSchema = new mongoose.Schema<IResume>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInfo: {
      type: {
        fullname: String,
        email: String,
        mobile: String,
        title: String,
        githublink : String,
        linkedIn: String,

        portfolio: String,
        location: String,
      },
      default: {},
    },
    summary: {
      type: String,
      default: "",
    },
    workExperience: {
      type: [
        {
          company: String,
          designation: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          techstack: [String],
          liveLink: String,
          githubLink: String,
          description: String,
        },
      ],
      defaults: [],
    },
    education: {
      type: [
        {
          institute: String,
          degree: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    achievements: [String],
  },
  {
    timestamps: true,
  },
);
const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default ResumeModel;
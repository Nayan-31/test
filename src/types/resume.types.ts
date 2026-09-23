import mongoose from "mongoose";

export interface IpersonalInformation {
    fullname : string;
    email : string;
    title : string;
    mobile : string;
    githublink?: string;
    linkedIn?: string;
    portfolio?: string;
    location : string;
}

export interface IWorkExperience {
    company : string;
    designation : string;
    startDate : Date;
    endDate : Date;
    description : string;
}

export interface IProjects {
    title : string;
    techstack : string[];
    liveLink ?: string ;
    githubLink : string;
    description : string
}

export interface IEducation {
    institute : string ;
    degree : string ;
    startDate : string;
    endDate : string 
}

export interface IResume {
    userId : mongoose.Types.ObjectId;
    personalInfo : IpersonalInformation;
    summary : string;
    skills : string[];
    workExperience : IWorkExperience[];
    projects : IProjects[];
    education : IEducation[];
    achievements : string[];
    certification : string[];
    createdAt ?: Date;
    updatedAt ?: Date;
}